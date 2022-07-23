import { createRouter } from 'server/utils/create-router'
import superjson from 'superjson'
import { commentRouter } from './comment-router'
import { feedbackRouter } from './feedback-router'
import { replyRouter } from './reply-router'
import { upvoteRouter } from './upvote-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('feedback.', feedbackRouter)
  .merge('upvote.', upvoteRouter)
  .merge('comment.', commentRouter)
  .merge('reply.', replyRouter)

// export type definition of API
export type AppRouter = typeof appRouter
