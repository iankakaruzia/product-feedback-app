import { z } from 'zod'

export const createReplyInput = z
  .object({
    commentId: z.number(),
    content: z.string(),
    replyingTo: z.string()
  })
  .required()
