import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Banner } from './Banner'

const pushMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
      push: pushMock
    }
  }
}))

describe('<Banner />', () => {
  it('should render banner correctly', () => {
    render(<Banner suggestionsCount={1} />)

    expect(screen.getByText('1 Suggestion')).toBeInTheDocument()
  })

  it('should render banner with multiple suggestions correctly', () => {
    render(<Banner suggestionsCount={2} />)

    expect(screen.getByText('2 Suggestions')).toBeInTheDocument()
  })

  it('should call push function', async () => {
    const user = userEvent.setup()

    render(<Banner suggestionsCount={1} />)

    // Open the menu
    await user.click(screen.getByText('Sort by:'))

    // Click MenuItem
    await user.click(screen.getByText('Most Comments'))

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '',
      query: {
        sort: 'comments:desc'
      }
    })

    await user.click(screen.getByText('Sort by:'))

    await user.click(screen.getByText('Most Upvotes'))

    expect(pushMock).toHaveBeenCalledTimes(2)
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '',
      query: {}
    })
  })
})
