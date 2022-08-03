import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { trpc } from 'lib/trpc'

import { AddFeedbackTemplate } from './AddFeedback'

const backMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      back: backMock
    }
  }
}))

describe('<AddFeedback />', () => {
  const mutateMock = jest.fn()

  jest
    .spyOn(trpc, 'useMutation')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockImplementation(() => ({ mutate: mutateMock, isLoading: false } as any))

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render feedback template correctly', async () => {
    await act(async () => {
      render(<AddFeedbackTemplate />)
    })

    expect(screen.getByText('Create New Feedback')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Feedback' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('should call back when back button is clicked', async () => {
    const user = userEvent.setup()
    await act(async () => {
      render(<AddFeedbackTemplate />)
    })

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(backMock).toHaveBeenCalled()
  })

  it('should call mutation when form is submitted', async () => {
    const user = userEvent.setup()

    await act(async () => {
      render(<AddFeedbackTemplate />)
    })

    await user.type(screen.getAllByRole('textbox')[0], 'Test Title')
    await user.type(screen.getAllByRole('textbox')[1], 'Test Description')

    await user.click(screen.getByRole('button', { name: 'Add Feedback' }))

    expect(mutateMock).toHaveBeenCalledTimes(1)
  })
})
