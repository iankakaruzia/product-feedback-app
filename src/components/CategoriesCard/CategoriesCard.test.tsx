import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { filterOptions } from 'utils/filter/fields'
import { CategoriesCard } from './CategoriesCard'

const pushMock = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
      push: pushMock
    }
  }
}))

describe('<CategoriesCard />', () => {
  it('should render categories badges', () => {
    render(<CategoriesCard />)

    filterOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('should call push with the correct query when all option is clicked', async () => {
    const user = userEvent.setup()
    render(<CategoriesCard />)

    await user.click(screen.getByText('All'))

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '',
      query: {}
    })
  })

  it('should call push with the correct query when a category is clicked', async () => {
    const user = userEvent.setup()
    render(<CategoriesCard />)

    await user.click(screen.getByText('Enhancement'))

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '',
      query: { category: 'enhancement' }
    })
  })
})
