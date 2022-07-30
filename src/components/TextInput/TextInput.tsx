import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'
import { classNames } from 'utils/styles/class-names'

type TextInputProps<T extends FieldValues> = {
  id?: string
  hasError?: boolean
  name: Path<T>
  register?: UseFormRegister<T>
  rules?: RegisterOptions
}

export function TextInput<T extends FieldValues>({
  id,
  hasError,
  name,
  register,
  rules
}: TextInputProps<T>) {
  return (
    <input
      id={id}
      type='text'
      aria-describedby={id ? `${id}-instructions` : undefined}
      aria-invalid={hasError ? 'true' : 'false'}
      name={name}
      className={classNames(
        'bg-gray-100 rounded-md h-12 px-4 text-body2 focus:ring-1',
        !!hasError
          ? 'border-red-500 focus:border-red-500 focus:ring-0'
          : 'border-none text-gray-700 focus:border-blue-700'
      )}
      {...(register && register(name, rules))}
    />
  )
}
