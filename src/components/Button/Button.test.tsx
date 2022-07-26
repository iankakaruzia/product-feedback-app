import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

describe('<Button />', () => {
  it('should render button with default values correctly', () => {
    render(<Button>Foo</Button>)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass(
      'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600'
    )
  })

  it('should render button with primary variant correctly', () => {
    render(<Button variant='primary'>Foo</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-purple-700 hover:bg-purple-500 disabled:bg-purple-500'
    )
  })

  it('should render button with info variant correctly', () => {
    render(<Button variant='info'>Foo</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-blue-700 hover:bg-blue-500 disabled:bg-blue-500'
    )
  })

  it('should render button with danger variant correctly', () => {
    render(<Button variant='danger'>Foo</Button>)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-red-500 hover:bg-red-300 disabled:bg-red-300'
    )
  })

  it('should render button with icon correctly', () => {
    render(<Button icon={<span data-testid='icon'>Icon</span>}>Foo</Button>)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render button with custom className correctly', () => {
    render(<Button className='custom-class'>Foo</Button>)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should call onClick callback correctly', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Foo</Button>)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalled()
  })
})
