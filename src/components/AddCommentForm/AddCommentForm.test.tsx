import { useUser } from '@auth0/nextjs-auth0'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { trpc } from 'lib/trpc'

import { AddCommentForm } from './AddCommentForm'

jest.mock('@auth0/nextjs-auth0')

const pushMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: pushMock
    }
  }
}))

describe('<AddCommentForm />', () => {
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

  it('should render correct comment form elements', () => {
    render(<AddCommentForm feedbackId={1} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', 'Type your comment here')

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should call mutate on submit', async () => {
    const user = userEvent.setup()

    render(<AddCommentForm feedbackId={1} />)

    await user.type(screen.getByRole('textbox'), 'Test comment')
    await user.click(screen.getByRole('button'))

    expect(mutateMock).toHaveBeenCalledTimes(1)
  })

  it('should call push if no user is logged in', async () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValue({ user: null })
    const user = userEvent.setup()

    render(<AddCommentForm feedbackId={1} />)

    await user.type(screen.getByRole('textbox'), 'Test comment')
    await user.click(screen.getByRole('button'))

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(mutateMock).not.toHaveBeenCalled()
  })

  it('should not call mutate if no comment is entered', async () => {
    const user = userEvent.setup()

    render(<AddCommentForm feedbackId={1} />)

    await user.click(screen.getByRole('button'))

    expect(mutateMock).not.toHaveBeenCalled()
    expect(pushMock).not.toHaveBeenCalled()
  })
})
