import { z } from 'zod'

import { feedbackOutput } from 'shared/outputs/feedback.outputs'

export type Category = z.infer<typeof feedbackOutput['_shape']['category']>
export type Status = z.infer<typeof feedbackOutput['_shape']['status']>

export type Feedback = z.infer<typeof feedbackOutput>

export type Roadmap = {
  inProgress: Feedback[]
  live: Feedback[]
  planned: Feedback[]
}
