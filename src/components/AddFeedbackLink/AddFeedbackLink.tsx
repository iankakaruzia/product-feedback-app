import Image from 'next/image'
import Link from 'next/link'

export function AddFeedbackLink() {
  return (
    <Link href='/feedback/add'>
      <a className='flex items-center h-10 md:h-11 font-bold text-body3 text-center text-gray-200 rounded-xl transition-colors px-4 md:px-6 bg-purple-700 hover:bg-purple-500'>
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
