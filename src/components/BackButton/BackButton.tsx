import { useRouter } from 'next/router'
import { classNames } from 'utils/styles/class-names'

type BackButtonProps = {
  theme?: 'light' | 'dark'
}

export function BackButton({ theme = 'light' }: BackButtonProps) {
  const { back } = useRouter()

  function goBack() {
    back()
  }

  return (
    <button onClick={goBack} className='group flex items-center'>
      <svg xmlns='http://www.w3.org/2000/svg' width='7' height='10'>
        <path
          fill='none'
          fillRule='evenodd'
          stroke={theme === 'light' ? '#4661E6' : '#CDD2EE'}
          strokeWidth='2'
          d='M6 9L2 5l4-4'
        ></path>
      </svg>
      <span
        className={classNames(
          'ml-4 text-body3 font-bold group-hover:underline',
          theme === 'light' ? 'text-gray-500' : 'text-white'
        )}
      >
        Go Back
      </span>
    </button>
  )
}
