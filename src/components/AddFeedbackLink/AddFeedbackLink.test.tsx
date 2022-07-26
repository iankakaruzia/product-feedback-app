import { render, screen } from '@testing-library/react'
import { AddFeedbackLink } from './AddFeedbackLink'

describe('<AddFeedbackLink />', () => {
  it('should render link correctly', () => {
    render(<AddFeedbackLink />)

    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/feedback/add')
  })
})
