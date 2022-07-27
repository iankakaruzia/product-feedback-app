import {
  RegisterOptions,
  UseFormRegister,
  Path,
  DeepMap,
  FieldError,
  FieldValues
} from 'react-hook-form'

import { classNames } from 'utils/styles/class-names'
import { Textarea } from '../Textarea'
import { TextInput } from '../TextInput'

type FormInputProps<T extends FieldValues> = {
  className?: string
  id?: string
  name: Path<T>
  label: string
  helperText: string
  type?: 'input' | 'textarea'
  register?: UseFormRegister<T>
  rules?: RegisterOptions
  errors?: Partial<DeepMap<T, FieldError>>
}

export function FormInput<T extends FieldValues>({
  className,
  id,
  name,
  label,
  helperText,
  type = 'input',
  register,
  rules,
  errors = {}
}: FormInputProps<T>) {
  const errorMessages = errors[name]
  const hasError = !!(errors && errorMessages)
  const InputComponent = type === 'textarea' ? Textarea : TextInput

  return (
    <div className={classNames('flex flex-col', className && className)}>
      <label htmlFor={id} className='text-body3 font-bold text-gray-700 mb-1'>
        {label}
      </label>
      <span
        id={id ? `${id}-instructions` : undefined}
        className='text-body3 text-gray-700 mb-4'
      >
        {helperText}
      </span>
      <InputComponent
        id={id}
        hasError={hasError}
        name={name}
        register={register}
        rules={rules}
      />
      {hasError && (
        <span role='alert' className='text-heading4 text-red-500'>
          {errorMessages.message}
        </span>
      )}
    </div>
  )
}
