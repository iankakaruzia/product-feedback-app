import Image from 'next/image'

import { AddFeedbackLink } from 'components/AddFeedbackLink'

export function EmptySuggestionsList() {
  return (
    <div className='my-8 mx-6 flex flex-col items-center rounded-xl bg-white py-18 px-6 md:m-0 md:mt-6 md:py-24 md:px-36'>
      <div className='relative h-[108px] w-[102px] md:h-[136.74px] md:w-[129.64px]'>
        <Image
          src='/assets/suggestions/illustration-empty.svg'
          alt='Person looking through a magnifier'
          layout='fill'
        />
      </div>

      <h3 className='mt-[39px] mb-[14px] text-center text-heading3 font-bold text-gray-700 md:text-heading1'>
        There is no feedback yet.
      </h3>
      <p className='mb-6 text-center text-body3 md:text-body1 lg:mb-12 lg:max-w-[410px]'>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>

      <AddFeedbackLink />
    </div>
  )
}
