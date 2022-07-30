import { useUser } from '@auth0/nextjs-auth0'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { trpc } from 'lib/trpc'
import { Feedback } from 'models/feedback.model'
import toast from 'react-hot-toast'
import { FeedbackInfoCard } from './FeedbackInfoCard'

jest.mock('@auth0/nextjs-auth0')

const pushMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock
    }
  }
}))

const feedbackMock: Feedback = {
  id: 1,
  title: 'Test feedback',
  description: 'Test description',
  category: 'FEATURE',
  status: 'PLANNED',
  upvotes: [
    { id: 1, authorId: 1 },
    { id: 1, authorId: 2 }
  ],
  authorId: 1,
  upvoted: true,
  comments: [{ id: 1, authorId: 1, content: 'Test comment' }]
}

describe('<FeedbackInfoCard />', () => {
  const mutateMock = jest.fn()

  jest
    .spyOn(trpc, 'useMutation')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockImplementation(() => ({ mutate: mutateMock, isLoading: false } as any))

  beforeEach(() => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValue({ user: { name: 'John Doe' } })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render card as clickable', async () => {
    const user = userEvent.setup()
    render(<FeedbackInfoCard feedback={feedbackMock} isClickable />)

    await user.click(screen.getAllByRole('button')[0])

    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith(`/feedback/${feedbackMock.id}`)
  })

  it('should render card as not clickable', async () => {
    const user = userEvent.setup()
    render(<FeedbackInfoCard feedback={feedbackMock} />)

    await user.click(screen.getByRole('banner'))

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('should go to correct page when badge is clicked', async () => {
    const user = userEvent.setup()
    render(<FeedbackInfoCard feedback={feedbackMock} />)

    await user.click(screen.getByText('Feature'))

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: {
        category: 'feature'
      }
    })
  })

  it('should not call mutate if no user is logged in', async () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValueOnce({ user: null })
    const user = userEvent.setup()
    const errorToastSpy = jest.spyOn(toast, 'error')

    render(<FeedbackInfoCard feedback={feedbackMock} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(mutateMock).not.toHaveBeenCalled()
    expect(errorToastSpy).toHaveBeenCalledTimes(1)
  })

  it('should call mutate if user is logged in', async () => {
    const user = userEvent.setup()
    const errorToastSpy = jest.spyOn(toast, 'error')

    render(<FeedbackInfoCard feedback={feedbackMock} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(mutateMock).toHaveBeenCalledTimes(1)
    expect(errorToastSpy).not.toHaveBeenCalled()
  })

  it('should not call mutate if isLoading is true', async () => {
    // eslint-disable-next-line prettier/prettier
    (trpc.useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mutateMock,
      isLoading: true
    }))

    const user = userEvent.setup()
    const errorToastSpy = jest.spyOn(toast, 'error')

    render(<FeedbackInfoCard feedback={feedbackMock} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(mutateMock).not.toHaveBeenCalled()
    expect(errorToastSpy).not.toHaveBeenCalled()
  })
})
