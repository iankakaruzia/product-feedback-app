import { z } from 'zod'

export const updateUpvoteInput = z
  .object({
    upvoteId: z.number()
  })
  .required()
