import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextInput } from './TextInput'

describe('<TextInput />', () => {
  it('should render input element', () => {
    render(<TextInput name='name' id='name' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-none text-gray-700')
  })

  it('should render input element with error', () => {
    render(<TextInput name='name' hasError />)

    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
  })

  it('should call register function', async () => {
    const user = userEvent.setup()
    const register = jest.fn()
    render(
      <TextInput name='name' register={register} rules={{ required: true }} />
    )

    await user.type(screen.getByRole('textbox'), 'test')

    expect(register).toHaveBeenCalledWith('name', {
      required: true
    })
  })
})
