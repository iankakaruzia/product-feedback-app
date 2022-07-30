import { Status } from 'models/feedback.model'

export function formatStatus(status: Status) {
  const formatedStatus: Record<Status, string> = {
    SUGGESTION: 'Suggestion',
    PLANNED: 'Planned',
    IN_PROGRESS: 'In-Progress',
    LIVE: 'Live'
  }

  return formatedStatus[status]
}
