import { Status, User } from '@prisma/client'
import { z } from 'zod'

import * as trpc from '@trpc/server'
import {
  createCursor,
  getIdFromCursor,
  groupRoadmapItems
} from 'server/helpers/feedback.helper'
import { createRouter } from 'server/utils/create-router'
import {
  createFeedbackInput,
  deleteFeedbackInput,
  getFeedbackInput,
  getRoadmapReportInput,
  getSuggestionsInput,
  updateFeedbackInput
} from 'shared/inputs/feedback.inputs'
import { feedbackOutput } from 'shared/outputs/feedback.outputs'

export const feedbackRouter = createRouter()
  .query('get-roadmap-items', {
    async resolve({ ctx }) {
      const [planned, inProgress, live] = await ctx.prisma.$transaction([
        ctx.prisma.feedback.count({ where: { status: 'PLANNED' } }),
        ctx.prisma.feedback.count({ where: { status: 'IN_PROGRESS' } }),
        ctx.prisma.feedback.count({ where: { status: 'LIVE' } })
      ])

      return {
        planned,
        inProgress,
        live
      }
    }
  })
  .query('get-roadmap-report', {
    input: getRoadmapReportInput,
    output: z
      .object({
        planned: z.array(feedbackOutput),
        inProgress: z.array(feedbackOutput),
        live: z.array(feedbackOutput)
      })
      .required(),
    async resolve({ ctx, input }) {
      const feedbacks = await ctx.prisma.feedback.findMany({
        where: {
          status: {
            in: ['PLANNED', 'IN_PROGRESS', 'LIVE']
          }
        },
        orderBy: {
          upvotes: {
            _count: 'desc'
          }
        },
        include: {
          upvotes: true,
          comments: true
        }
      })

      let user: User | null = null

      if (ctx.session?.user.email || input?.currentUser) {
        user = await ctx.prisma.user.findUnique({
          where: { email: ctx.session?.user.email ?? input?.currentUser }
        })
      }

      if (!feedbacks.length) {
        return {
          planned: [],
          inProgress: [],
          live: []
        }
      }

      return {
        planned: groupRoadmapItems(feedbacks, Status.PLANNED, user),
        inProgress: groupRoadmapItems(feedbacks, Status.IN_PROGRESS, user),
        live: groupRoadmapItems(feedbacks, Status.LIVE, user)
      }
    }
  })
  .query('get-feedback', {
    input: getFeedbackInput,
    output: feedbackOutput.nullable(),
    async resolve({ ctx, input }) {
      const feedback = await ctx.prisma.feedback.findUnique({
        where: { id: input.feedbackId },
        include: {
          comments: true,
          upvotes: true
        }
      })

      if (!feedback) {
        return null
      }

      let upvoted = false

      if (ctx.session?.user.email || input.currentUser) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.session?.user.email ?? input.currentUser
          }
        })

        if (user) {
          const upvote = await ctx.prisma.upvote.findFirst({
            where: {
              feedbackId: feedback.id,
              authorId: user.id
            }
          })

          upvoted = !!upvote
        }
      }

      return {
        ...feedback,
        upvoted
      }
    }
  })
  .query('get-suggestions', {
    input: getSuggestionsInput,
    output: z
      .object({
        suggestions: z.array(feedbackOutput),
        nextCursor: z.string().nullable()
      })
      .required(),
    async resolve({ ctx, input = {} }) {
      const limit = input?.limit ?? 10
      const { cursor, currentUser, filterBy, orderBy, sortBy } = input
      const sortByLowercased = sortBy?.toLowerCase() ?? 'upvotes'
      const orderByLowercased = orderBy?.toLowerCase() ?? 'desc'

      const suggestions = await ctx.prisma.feedback.findMany({
        take: limit + 1,
        where: {
          status: 'SUGGESTION',
          ...(filterBy ? { category: filterBy } : {})
        },
        cursor: cursor ? { id: getIdFromCursor(cursor) } : undefined,
        orderBy: {
          [sortByLowercased]: {
            _count: orderByLowercased
          }
        },
        include: {
          upvotes: true,
          comments: true
        }
      })

      let nextCursor: typeof cursor | null = null
      if (suggestions.length > limit) {
        const nextItem = suggestions.pop()
        nextCursor = createCursor(nextItem?.id ?? 0)
      }

      let user: User | null = null

      if (ctx.session?.user.email || currentUser) {
        user = await ctx.prisma.user.findUnique({
          where: { email: ctx.session?.user.email ?? currentUser }
        })
      }

      return {
        suggestions: suggestions.map((suggestion) => ({
          ...suggestion,
          upvoted:
            user !== null
              ? suggestion.upvotes.some(
                  (upvote) => upvote.authorId === user?.id
                )
              : false
        })),
        nextCursor
      }
    }
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session?.user.email) {
      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You need to be logged in to perform this action'
      })
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.session.user.email
      }
    })

    if (!user) {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong'
      })
    }

    return next({
      ctx: {
        ...ctx,
        user
      }
    })
  })
  .mutation('create-feedback', {
    input: createFeedbackInput,
    async resolve({ ctx, input }) {
      return ctx.prisma.feedback.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          authorId: ctx.user.id
        },
        include: {
          upvotes: true,
          comments: true
        }
      })
    }
  })
  .mutation('delete-feedback', {
    input: deleteFeedbackInput,
    async resolve({ ctx, input }) {
      const feedback = await ctx.prisma.feedback.findUnique({
        where: { id: input.feedbackId }
      })

      if (!feedback) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Unable to find feedback with given ID'
        })
      }

      if (feedback.authorId !== ctx.user.id && ctx.user.role !== 'ADMIN') {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "You don't have permission to perform this action"
        })
      }

      await ctx.prisma.feedback.delete({
        where: { id: feedback.id }
      })
    }
  })
  .mutation('update-feedback', {
    input: updateFeedbackInput,
    async resolve({ ctx, input }) {
      const oldFeedback = await ctx.prisma.feedback.findUnique({
        where: { id: input.feedbackId }
      })

      if (!oldFeedback) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Unable to find feedback with given ID'
        })
      }

      if (oldFeedback.authorId !== ctx.user.id && ctx.user.role !== 'ADMIN') {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: "You don't have permission to perform this action"
        })
      }

      if (oldFeedback.status !== input.status && ctx.user.role !== 'ADMIN') {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Only an Admin can update the status of a feedback'
        })
      }

      await ctx.prisma.feedback.update({
        where: { id: oldFeedback.id },
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          status: input.status
        }
      })
    }
  })
