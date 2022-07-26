import { ButtonHTMLAttributes } from 'react'
import { classNames } from 'utils/styles/class-names'

type BadgeProps = {
  isActive?: boolean
  label: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function Badge({
  onClick,
  isActive = false,
  label,
  className,
  ...props
}: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'rounded-xl px-4 py-[6px] text-body3 font-semibold transition-colors',
        isActive
          ? 'bg-blue-700 text-white'
          : 'bg-[#F2F4FF] text-blue-700 hover:bg-[#CFD7FF]',
        className && className
      )}
      {...props}
    >
      {label}
    </button>
  )
}
