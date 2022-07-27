import { AddFeedbackLink } from 'components/AddFeedbackLink'
import Image from 'next/image'

export function EmptySuggestionsList() {
  return (
    <div className='bg-white rounded-xl my-8 mx-6 md:m-0 md:mt-6 py-18 md:py-24 px-6 md:px-36 flex flex-col items-center'>
      <div className='h-[108px] md:h-[136.74px] w-[102px] md:w-[129.64px] relative'>
        <Image
          src='/assets/suggestions/illustration-empty.svg'
          alt='Person looking through a magnifier'
          layout='fill'
        />
      </div>

      <h3 className='mt-[39px] mb-[14px] text-heading3 md:text-heading1 font-bold text-center text-gray-700'>
        There is no feedback yet.
      </h3>
      <p className='text-center text-body3 md:text-body1 mb-6 lg:mb-12 lg:max-w-[410px]'>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>

      <AddFeedbackLink />
    </div>
  )
}
