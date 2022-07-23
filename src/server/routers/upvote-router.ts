import * as trpc from '@trpc/server'
import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const upvoteRouter = createRouter().mutation('update-upvote', {
  input: z.object({
    upvoteId: z.number()
  }),
  async resolve({ ctx, input }) {
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

    const feedback = await ctx.prisma.feedback.findUnique({
      where: { id: input.upvoteId }
    })

    if (!feedback) {
      throw new trpc.TRPCError({
        code: 'NOT_FOUND',
        message: 'Unable to find feedback with given ID'
      })
    }

    const upvote = await ctx.prisma.upvote.findFirst({
      where: {
        feedbackId: feedback.id,
        authorId: user.id
      }
    })

    if (upvote) {
      await ctx.prisma.upvote.delete({ where: { id: upvote.id } })
    } else {
      await ctx.prisma.upvote.create({
        data: {
          feedbackId: feedback.id,
          authorId: user.id
        }
      })
    }
  }
})
