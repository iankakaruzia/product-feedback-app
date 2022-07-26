import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Badge } from './Badge'

describe('<Badge />', () => {
  it('should render inactive badge', () => {
    render(<Badge label='Foo' />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('text-blue-700')
  })

  it('should render active badge', () => {
    render(<Badge label='Foo' isActive />)

    expect(screen.getByRole('button')).toHaveClass('text-white')
  })

  it('should render badge with custom className', () => {
    render(<Badge label='Foo' className='custom-class' />)

    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('should call onClick callback', async () => {
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    render(<Badge label='Foo' onClick={onClickMock} />)

    await user.click(screen.getByRole('button'))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
