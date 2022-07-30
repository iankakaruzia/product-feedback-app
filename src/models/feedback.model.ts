import { z } from 'zod'
import { feedbackOutput } from 'shared/outputs/feedback'

export type Feedback = z.infer<typeof feedbackOutput>

export type Roadmap = {
  inProgress: Feedback[]
  live: Feedback[]
  planned: Feedback[]
}
