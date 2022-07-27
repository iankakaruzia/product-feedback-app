import { render, screen } from '@testing-library/react'

import { FormInput } from './FormInput'

describe('<FormInput />', () => {
  it('should render default input', () => {
    render(<FormInput id='foo' name='foo' label='bar' helperText='baz' />)

    expect(screen.getByLabelText('bar')).toBeInTheDocument()
    expect(screen.getByText('baz')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).not.toHaveClass('min-h-[120px]')
  })

  it('should render textarea', () => {
    render(
      <FormInput type='textarea' name='foo' label='bar' helperText='baz' />
    )

    expect(screen.getByText('baz')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('min-h-[120px]')
  })

  it('should render error', () => {
    render(
      <FormInput
        id='foo'
        name='foo'
        label='bar'
        helperText='baz'
        errors={{ foo: { message: 'Error' } }}
      />
    )

    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('should render input with custom class', () => {
    render(
      <FormInput
        className='custom-class'
        id='foo'
        name='foo'
        label='bar'
        helperText='baz'
      />
    )

    expect(screen.getByLabelText('bar').parentElement).toHaveClass(
      'custom-class'
    )
  })
})
