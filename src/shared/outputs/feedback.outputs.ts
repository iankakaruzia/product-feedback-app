import { z } from 'zod'

import { CATEGORIES, STATUSES } from 'shared/constants/feedback.constants'

export const feedbackOutput = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORIES),
    status: z.enum(STATUSES),
    authorId: z.number(),
    upvoted: z.boolean(),
    comments: z.array(
      z.object({
        id: z.number(),
        content: z.string(),
        authorId: z.number()
      })
    ),
    upvotes: z.array(
      z.object({
        id: z.number(),
        authorId: z.number()
      })
    )
  })
  .required()
