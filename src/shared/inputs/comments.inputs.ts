import { z } from 'zod'

export const getCommentsInput = z
  .object({
    feedbackId: z.number()
  })
  .required()

export const createCommentInput = z
  .object({
    feedbackId: z.number(),
    content: z
      .string()
      .min(1, { message: "Can't be empty" })
      .max(250, { message: "Comment can't have more than 250 characters" })
  })
  .required()
