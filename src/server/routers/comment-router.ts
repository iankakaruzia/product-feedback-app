import * as trpc from '@trpc/server'
import { createRouter } from 'server/utils/create-router'
import { z } from 'zod'

export const commentRouter = createRouter()
  .query('get-comments', {
    input: z.object({
      feedbackId: z.number()
    }),
    async resolve({ ctx, input }) {
      const commentsWithReplies = await ctx.prisma.comment.findMany({
        where: {
          feedbackId: input.feedbackId
        },
        include: {
          replies: {
            include: {
              author: true,
              replyingTo: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return commentsWithReplies
    }
  })
  .mutation('create-comment', {
    input: z.object({
      feedbackId: z.number(),
      content: z.string()
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
        where: {
          id: input.feedbackId
        }
      })

      if (!feedback) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Unable to find feedback with given ID'
        })
      }

      return await ctx.prisma.comment.create({
        data: {
          content: input.content,
          authorId: user.id,
          feedbackId: feedback.id
        },
        include: {
          author: true,
          replies: true
        }
      })
    }
  })
