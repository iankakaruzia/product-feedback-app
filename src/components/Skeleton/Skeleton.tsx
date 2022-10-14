import { ReactNode } from 'react'
import { classNames } from 'utils/styles/class-names'

type SkeletonProps = {
  children: ReactNode
  className?: string
}

export function Skeleton({ children, className }: SkeletonProps) {
  return (
    <div
      role='status'
      aria-live='assertive'
      aria-label='Loading...'
      className={classNames(
        'flex w-full animate-pulse flex-col',
        className && className
      )}
    >
      {children}
    </div>
  )
}

type SkeletonTypesProps = {
  className?: string
}

Skeleton.Line = function SkeletonLine({ className }: SkeletonTypesProps) {
  return (
    <div
      className={classNames(
        'h-5 w-full rounded-xl bg-[#F2F4FF]',
        className && className
      )}
    />
  )
}

Skeleton.Circle = function SkeletonCircle({ className }: SkeletonTypesProps) {
  return (
    <div
      className={classNames(
        'h-10 w-10 rounded-full bg-[#F2F4FF]',
        className && className
      )}
    />
  )
}
