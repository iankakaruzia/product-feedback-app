import { Comment, Feedback, Status, Upvote, User } from '@prisma/client'

type FeedbackArray = (Feedback & {
  upvotes: Upvote[]
  comments: Comment[]
})[]

export function groupRoadmapItems(
  feedbacks: FeedbackArray,
  groupBy: Omit<Status, 'SUGGESTION'>,
  user: User | null
) {
  const filteredArray = feedbacks.filter(
    (feedback) => feedback.status === groupBy
  )

  return filteredArray.map((feedback) => ({
    id: feedback.id,
    title: feedback.title,
    description: feedback.description,
    category: feedback.category,
    status: feedback.status,
    upvotes: feedback.upvotes,
    comments: feedback.comments,
    authorId: feedback.authorId,
    upvoted:
      user !== null
        ? feedback.upvotes.some((upvote) => upvote.authorId === user?.id)
        : false
  }))
}

export function createCursor(id: number): string {
  return Buffer.from(`${id}`).toString('base64')
}

export function getIdFromCursor(cursor: string): number {
  return parseInt(Buffer.from(cursor, 'base64').toString('ascii'))
}
