import * as trpc from '@trpc/server'
import { createRouter } from 'server/utils/create-router'

export const userRouter = createRouter()
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
  .query('me', {
    async resolve({ ctx }) {
      return ctx.user
    }
  })
