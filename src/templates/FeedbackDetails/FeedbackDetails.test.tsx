import { render, screen } from '@testing-library/react'
import { trpc } from 'lib/trpc'

import { FeedbackDetailsTemplate } from './FeedbackDetails'

jest.mock('components/AddCommentForm', () => ({
  __esModule: true,
  AddCommentForm: function () {
    return <div data-testid='Mock Add Comment Form' />
  }
}))

jest.mock('components/BackButton', () => ({
  __esModule: true,
  BackButton: function () {
    return <div data-testid='Mock Back Button' />
  }
}))

jest.mock('components/FeedbackInfoCard', () => ({
  __esModule: true,
  FeedbackInfoCard: function () {
    return <div data-testid='Mock Feedback Info Card' />
  }
}))

const commentsMock = [
  {
    id: 1,
    content: 'Comment 1',
    author: {
      username: 'johndoe',
      picture: '/some-image.png'
    }
  },
  {
    id: 2,
    content: 'Comment 2',
    author: { name: 'Jane Doe', username: 'janedoe' }
  }
]

describe('<FeedbackDetailsTemplate />', () => {
  it.each([
    { comments: [], commentsHeader: 'No comments yet' },
    { comments: [commentsMock[0]], commentsHeader: '1 Comment' },
    { comments: commentsMock, commentsHeader: '2 Comments' }
  ])(
    'should render "$commentsHeader" given the comments',
    ({ comments, commentsHeader }) => {
      jest
        .spyOn(trpc, 'useQuery')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValueOnce({ data: {} } as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValueOnce({ data: comments } as any)
      render(<FeedbackDetailsTemplate feedbackId={1} currentUser='' />)

      expect(screen.getByText(commentsHeader)).toBeInTheDocument()
    }
  )
  it('should render feedback detail info when there is a feedback', () => {
    jest
      .spyOn(trpc, 'useQuery')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValueOnce({ data: {} } as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValueOnce({ data: commentsMock } as any)

    render(<FeedbackDetailsTemplate feedbackId={1} currentUser='' />)

    expect(screen.getByTestId('Mock Back Button')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Feedback Info Card')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Add Comment Form')).toBeInTheDocument()
    expect(screen.getByText('Edit Feedback')).toBeInTheDocument()
  })

  it('should render error message when there is an error', () => {
    jest
      .spyOn(trpc, 'useQuery')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValueOnce({ data: null, error: 'Some Error' } as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValueOnce({ data: commentsMock } as any)

    render(<FeedbackDetailsTemplate feedbackId={1} currentUser='' />)

    expect(
      screen.getByText('Unable fetch the feedback information!')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('Mock Feedback Info Card')).toBeNull()
  })
})
