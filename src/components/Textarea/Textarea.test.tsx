import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Textarea } from './Textarea'

describe('<Textarea />', () => {
  it('should render textarea', () => {
    render(<Textarea name='description' id='description' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-none text-gray-700')
  })

  it('should render textarea with error', () => {
    render(<Textarea name='description' hasError />)

    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  it('should call register function', async () => {
    const user = userEvent.setup()
    const register = jest.fn()
    render(
      <Textarea
        name='description'
        register={register}
        rules={{ required: true }}
      />
    )

    await user.type(screen.getByRole('textbox'), 'test')

    expect(register).toHaveBeenCalledWith('description', {
      required: true
    })
  })
})
