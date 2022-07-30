import { z } from 'zod'

export const updateUpvoteInput = z
  .object({
    feedbackId: z.number()
  })
  .required()
