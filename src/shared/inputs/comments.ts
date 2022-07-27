import { z } from 'zod'

export const getCommentsInput = z
  .object({
    feedbackId: z.number()
  })
  .required()

export const createCommentInput = z
  .object({
    feedbackId: z.number(),
    content: z.string()
  })
  .required()
