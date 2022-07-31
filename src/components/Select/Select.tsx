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
      <label htmlFor={id} className='text-body3 font-bold text-gray-700 mb-1'>
        {label}
      </label>
      <span
        id={id ? `${id}-instructions` : undefined}
        className='text-body3 text-gray-500 mb-4'
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
              onChange(e)
              setSelectedOption(e)
            }}
          >
            {({ open }) => (
              <div className='relative'>
                <Listbox.Button className='relative flex items-center justify-between px-6 w-full rounded-md bg-gray-100 h-12 focus:ring-1 border-none text-gray-700 focus:border-blue-700'>
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
                        'stroke-2 stroke-blue-700',
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
                  <Listbox.Options className='absolute bg-white rounded-xl inset-x-0 top-0 shadow-lg'>
                    {options.map((option) => (
                      <Listbox.Option
                        key={`select-option-${option.value}`}
                        value={option}
                        as={Fragment}
                      >
                        {({ selected, active }) => (
                          <li
                            className={classNames(
                              'h-12 px-6 w-full text-left leading-[23px] border-t border-gray-800 border-solid border-opacity-[0.15] first:border-0 flex items-center justify-between transition-colors',
                              active && 'bg-purple-700'
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
