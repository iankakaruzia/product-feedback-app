import { z } from 'zod'

import { ORDER_BY, SORT_BY } from 'shared/constants/feedback.constants'
import { feedbackOutput } from 'shared/outputs/feedback.outputs'

const sortByEnum = z.enum(SORT_BY)
const orderByEnum = z.enum(ORDER_BY)

export type Category = z.infer<typeof feedbackOutput['_shape']['category']>
export type Status = z.infer<typeof feedbackOutput['_shape']['status']>
export type SortBy = z.infer<typeof sortByEnum>
export type OrderBy = z.infer<typeof orderByEnum>

export type Feedback = z.infer<typeof feedbackOutput>

export type Roadmap = {
  inProgress: Feedback[]
  live: Feedback[]
  planned: Feedback[]
}

export type FilterOption = {
  label: string
  category: Category | null
}

export type SortOption = {
  label: string
  sortBy: SortBy
  orderBy: OrderBy
}
