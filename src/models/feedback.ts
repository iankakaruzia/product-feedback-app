export type Category = 'FEATURE' | 'UI' | 'UX' | 'ENHANCEMENT' | 'BUG'

export type Status = 'SUGGESTION' | 'PLANNED' | 'IN_PROGRESS' | 'LIVE'

export type Role = 'USER' | 'ADMIN'

export type Feedback = {
  category: Category
  comments: number
  description: string
  id: number
  title: string
  upvotes: number
  status: Status
  authorId: number
  upvoted: boolean
}

export type Roadmap = {
  inProgress: Feedback[]
  live: Feedback[]
  planned: Feedback[]
}
