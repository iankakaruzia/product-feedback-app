import * as trpc from '@trpc/server'
import { createRouter } from 'server/utils/create-router'
import { createReplyInput } from 'shared/inputs/reply'

export const replyRouter = createRouter().mutation('create-reply', {
  input: createReplyInput,
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

    const comment = await ctx.prisma.comment.findUnique({
      where: {
        id: input.commentId
      }
    })

    if (!comment) {
      throw new trpc.TRPCError({
        code: 'NOT_FOUND',
        message: 'Unable to find comment with given ID'
      })
    }

    return await ctx.prisma.reply.create({
      data: {
        content: input.content,
        author: {
          connect: {
            id: user.id
          }
        },
        comment: {
          connect: {
            id: comment.id
          }
        },
        replyingTo: {
          connect: {
            username: input.replyingTo
          }
        }
      },
      include: {
        author: true
      }
    })
  }
})
