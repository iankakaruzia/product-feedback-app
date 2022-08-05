import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  FieldValues,
  Path
} from 'react-hook-form'
import { classNames } from 'utils/styles/class-names'

type Option = {
  label: string
  value: string
}

type SelectProps<T extends FieldValues> = {
  className?: string
  id?: string
  name: Path<T>
  label: string
  helperText: string
  options: Option[]
  defaultOption?: Option
  disabled?: boolean
  control?: Control<T>
  errors?: Partial<DeepMap<T, FieldError>>
}

export function Select<T extends FieldValues>({
  className,
  id,
  name,
  label,
  helperText,
  control,
  options,
  defaultOption,
  disabled,
  errors = {}
}: SelectProps<T>) {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption ?? options[0]
  )
  const errorMessage = errors[name]
  const hasError = !!(errors && errorMessage)

  return (
    <div className={classNames('flex flex-col', className && className)}>
      <label htmlFor={id} className='mb-1 text-body3 font-bold text-gray-700'>
        {label}
      </label>
      <span
        id={id ? `${id}-instructions` : undefined}
        className='mb-4 text-body3 text-gray-500'
      >
        {helperText}
      </span>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Listbox
            disabled={disabled}
            value={selectedOption}
            onChange={(e) => {
              onChange(e.value)
              setSelectedOption(e)
            }}
          >
            {({ open }) => (
              <div className='relative'>
                <Listbox.Button className='relative flex h-12 w-full items-center justify-between rounded-md border-none bg-gray-100 px-6 text-gray-700 focus:border-blue-700 focus:ring-1'>
                  <span
                    className={classNames(
                      'text-body2',
                      disabled && 'opacity-50'
                    )}
                  >
                    {selectedOption.label}
                  </span>
                  <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d={open ? 'M1 6l4-4 4 4' : 'M1 1l4 4 4-4'}
                      className={classNames(
                        'stroke-blue-700 stroke-2',
                        disabled ? 'opacity-50' : 'opacity-100'
                      )}
                      fill='none'
                      fillRule='evenodd'
                    />
                  </svg>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute inset-x-0 top-0 rounded-xl bg-white shadow-lg'>
                    {options.map((option) => (
                      <Listbox.Option
                        key={`select-option-${option.value}`}
                        value={option}
                        as={Fragment}
                      >
                        {({ selected, active }) => (
                          <li
                            className={classNames(
                              'flex h-12 w-full items-center justify-between border-t border-solid border-gray-800 border-opacity-[0.15] px-6 text-left leading-[23px] transition-colors first:border-0',
                              active && 'text-purple-700'
                            )}
                          >
                            <span>{option.label}</span>
                            {selected && (
                              <Image
                                src='/assets/shared/icon-check.svg'
                                alt=''
                                width={13}
                                height={11}
                              />
                            )}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        )}
      />

      {hasError && (
        <span className='text-heading4 text-red-500'>
          {errorMessage.message}
        </span>
      )}
    </div>
  )
}
