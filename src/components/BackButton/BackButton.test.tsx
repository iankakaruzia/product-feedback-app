import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BackButton } from './BackButton'

const backMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      back: backMock
    }
  }
}))

describe('<BackButton />', () => {
  it('should render button correctly', () => {
    render(<BackButton />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(/go back/i)).toHaveClass('text-gray-500')
  })

  it('should render dark button correctly', () => {
    render(<BackButton theme='dark' />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(/go back/i)).toHaveClass('text-white')
  })

  it('should call back function when clicked', async () => {
    const user = userEvent.setup()

    render(<BackButton />)

    await user.click(screen.getByRole('button'))

    expect(backMock).toHaveBeenCalledTimes(1)
  })
})
