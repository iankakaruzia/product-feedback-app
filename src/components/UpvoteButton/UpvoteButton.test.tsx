import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UpvoteButton } from './UpvoteButton'

describe('<UpvoteButton />', () => {
  it('should render default upvote button', () => {
    render(<UpvoteButton count={0} />)

    expect(screen.getByRole('button')).toHaveClass('bg-gray-200 text-gray-700')
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should render active upvote button', () => {
    render(<UpvoteButton count={0} isActive />)

    expect(screen.getByRole('button')).toHaveClass('bg-blue-700 text-white')
  })

  it('should call onClick callback', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<UpvoteButton count={0} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
