import { render, screen } from '@testing-library/react'

import { EmptySuggestionsList } from './EmptySuggestionsList'

describe('<EmptySuggestionsList />', () => {
  it('should render empty message', () => {
    render(<EmptySuggestionsList />)

    expect(screen.getByText('There is no feedback yet.')).toBeInTheDocument()
  })
})
