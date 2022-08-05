import Image from 'next/image'
import Link from 'next/link'

export function AddFeedbackLink() {
  return (
    <Link href='/feedback/add'>
      <a className='flex h-10 items-center rounded-xl bg-purple-700 px-4 text-center text-body3 font-bold text-gray-200 transition-colors hover:bg-purple-500 md:h-11 md:px-6'>
        <Image
          src='/assets/shared/icon-plus.svg'
          alt=''
          height={9}
          width={9}
          className='ml-2'
        />
        <span className='ml-1'>Add Feedback</span>
      </a>
    </Link>
  )
}
