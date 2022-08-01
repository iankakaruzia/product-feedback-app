import { FilterOption, SortOption } from 'models/feedback.model'

export const CATEGORIES = ['FEATURE', 'UI', 'UX', 'ENHANCEMENT', 'BUG'] as const
export const STATUSES = [
  'SUGGESTION',
  'PLANNED',
  'IN_PROGRESS',
  'LIVE'
] as const
export const SORT_BY = ['UPVOTES', 'COMMENTS'] as const
export const ORDER_BY = ['ASC', 'DESC'] as const

export const filterOptions: FilterOption[] = [
  {
    label: 'All',
    category: null
  },
  {
    label: 'UI',
    category: 'UI'
  },
  {
    label: 'UX',
    category: 'UX'
  },
  {
    label: 'Enhancement',
    category: 'ENHANCEMENT'
  },
  {
    label: 'Bug',
    category: 'BUG'
  },
  {
    label: 'Feature',
    category: 'FEATURE'
  }
]

export const sortOptions: SortOption[] = [
  {
    label: 'Most Upvotes',
    sortBy: 'UPVOTES',
    orderBy: 'DESC'
  },
  {
    label: 'Least Upvotes',
    sortBy: 'UPVOTES',
    orderBy: 'ASC'
  },
  {
    label: 'Most Comments',
    sortBy: 'COMMENTS',
    orderBy: 'DESC'
  },
  {
    label: 'Least Comments',
    sortBy: 'COMMENTS',
    orderBy: 'ASC'
  }
]
