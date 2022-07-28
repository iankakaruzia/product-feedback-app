import { useUser } from '@auth0/nextjs-auth0'
import { render, screen } from '@testing-library/react'

import { AuthCard } from './AuthCard'

jest.mock('@auth0/nextjs-auth0')

describe('<AuthCard />', () => {
  it('should render login link when no user is found', () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValueOnce({ user: null })
    render(<AuthCard />)

    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should render logout link when user is found', () => {
    // eslint-disable-next-line prettier/prettier
    (useUser as jest.Mock).mockReturnValueOnce({ user: { name: 'John Doe' } })
    render(<AuthCard />)

    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
