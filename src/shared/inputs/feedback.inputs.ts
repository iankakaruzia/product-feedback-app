import { z } from 'zod'

import { CATEGORIES, STATUSES } from 'shared/constants/feedback.constants'

const currentUserInput = z.string().optional()
const SORT_BY = ['UPVOTES', 'COMMENTS'] as const
const ORDER_BY = ['ASC', 'DESC'] as const

export const getRoadmapReportInput = z
  .object({
    currentUser: currentUserInput
  })
  .optional()

export const getFeedbackInput = z
  .object({
    feedbackId: z.number(),
    currentUser: currentUserInput
  })
  .required()

export const getSuggestionsInput = z
  .object({
    limit: z.number().min(1).max(100).optional(),
    cursor: z.string().optional(),
    currentUser: currentUserInput,
    filterBy: z.enum(CATEGORIES).optional(),
    sortBy: z.enum(SORT_BY).optional(),
    orderBy: z.enum(ORDER_BY).optional()
  })
  .optional()

export const createFeedbackInput = z
  .object({
    category: z.enum(CATEGORIES),
    title: z.string(),
    description: z.string()
  })
  .required()

export const deleteFeedbackInput = z
  .object({
    feedbackId: z.number()
  })
  .required()

export const updateFeedbackInput = z
  .object({
    feedbackId: z.number(),
    category: z.enum(CATEGORIES),
    title: z.string(),
    description: z.string(),
    status: z.enum(STATUSES)
  })
  .required()
