import { Category } from 'models/feedback'

export type FilterOption = {
  label: string
  category: Category | null
}

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

export type SortBy = 'UPVOTES' | 'COMMENTS'

export type OrderBy = 'ASC' | 'DESC'

export type SortOption = {
  label: string
  sortBy: SortBy
  orderBy: OrderBy
}

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
