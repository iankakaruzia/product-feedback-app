import { useUser } from '@auth0/nextjs-auth0'
import { render, screen } from '@testing-library/react'

import { HeaderCard } from './HeaderCard'

jest.mock('@auth0/nextjs-auth0')

describe('<HeaderCard />', () => {
  it('should render header card without user', () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValueOnce({ user: null })
    render(<HeaderCard />)

    expect(screen.getByText('Frontend Mentor')).toBeInTheDocument()
    expect(screen.getByText('Feedback Board')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should render header card with user', () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValueOnce({ user: { name: 'John Doe' } })
    render(<HeaderCard />)

    expect(screen.getByText('Frontend Mentor')).toBeInTheDocument()
    expect(screen.getByText('Feedback Board')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
