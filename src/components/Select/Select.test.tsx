import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import { Select } from './Select'

const optionsMock = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]

describe('<Select />', () => {
  it('should render select correctly', async () => {
    const user = userEvent.setup()
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
        />
      )
    }
    render(<Component />)

    expect(screen.getByText('Foo')).toBeInTheDocument()
    expect(screen.getByText('Bar')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Option 1' }))

    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('should render select correctly with default option', () => {
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          defaultOption={optionsMock[2]}
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
        />
      )
    }
    render(<Component />)

    expect(screen.queryByRole('button', { name: 'Option 1' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Option 3' })).toBeInTheDocument()
  })

  it('should change selected option', async () => {
    const user = userEvent.setup()
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          id='foo'
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
        />
      )
    }
    render(<Component />)

    await user.click(screen.getByRole('button', { name: 'Option 1' }))
    await user.click(screen.getByRole('option', { name: 'Option 2' }))

    expect(screen.queryByRole('button', { name: 'Option 1' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument()
  })

  it('should render select correctly with error', () => {
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
          errors={{ foo: { message: 'Error' } }}
        />
      )
    }
    render(<Component />)

    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('should render select correctly with disabled', () => {
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          disabled
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
        />
      )
    }
    render(<Component />)

    expect(screen.getByRole('button', { name: 'Option 1' })).toBeDisabled()
  })

  it('should render select with custom class name', () => {
    const Component = () => {
      const { control } = useForm()
      return (
        <Select
          options={optionsMock}
          disabled
          name='foo'
          label='Foo'
          helperText='Bar'
          control={control}
          className='custom-class'
        />
      )
    }
    render(<Component />)

    expect(screen.getByText('Foo').parentElement).toHaveClass('custom-class')
  })
})
