import { ButtonHTMLAttributes } from 'react'
import { classNames } from 'utils/styles/class-names'

export type UpvoteButtonProps = {
  count: number
  isActive?: boolean
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function UpvoteButton({
  count,
  isActive = false,
  onClick,
  className,
  ...props
}: UpvoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex items-center rounded-xl px-4 py-1 text-body3 font-bold transition-all md:flex-col md:px-3 md:py-2 md:pt-3',
        isActive
          ? 'bg-blue-700 text-white hover:opacity-80'
          : 'bg-gray-200 text-gray-700 hover:bg-[#CFD7FF]',
        className && className
      )}
      {...props}
    >
      <svg
        width='10'
        height='7'
        xmlns='http://www.w3.org/2000/svg'
        className='mr-2 md:mr-0 md:mb-2'
      >
        <path
          d='M1 6l4-4 4 4'
          className={classNames(isActive ? 'stroke-white' : 'stroke-blue-700')}
          strokeWidth='2'
          fill='none'
          fillRule='evenodd'
        />
      </svg>
      {count}
    </button>
  )
}
