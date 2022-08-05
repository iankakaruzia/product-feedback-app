import { ButtonHTMLAttributes, ReactNode } from 'react'
import { classNames } from 'utils/styles/class-names'

export type ButtonProps = {
  variant?: 'default' | 'primary' | 'info' | 'danger'
  icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'default',
  icon,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        'h-10 rounded-xl px-4 text-center text-body3 font-bold text-gray-200 transition-colors disabled:cursor-not-allowed disabled:opacity-80 md:h-11 md:px-6',
        variant === 'default' &&
          'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600',
        variant === 'primary' &&
          'bg-purple-700 hover:bg-purple-500 disabled:bg-purple-500',
        variant === 'info' &&
          'bg-blue-700 hover:bg-blue-500 disabled:bg-blue-500',
        variant === 'danger' &&
          'bg-red-500 hover:bg-red-300 disabled:bg-red-300',
        className && className
      )}
      {...props}
    >
      {!!icon && icon}
      {children && (
        <span className={classNames(!!icon && 'ml-1')}>{children}</span>
      )}
    </button>
  )
}
