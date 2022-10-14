import { render, screen } from '@testing-library/react'

import { Skeleton } from './Skeleton'

describe('<Skeleton />', () => {
  it('should render skeleton elements correctly', () => {
    render(
      <Skeleton>
        <Skeleton.Line className='w-28' />

        <div className='mt-7 flex items-center gap-4'>
          <Skeleton.Circle className='ml-4' />
          <Skeleton.Line />
        </div>

        <div className='mt-4 flex flex-col gap-2'>
          <Skeleton.Line />
          <Skeleton.Line />
          <Skeleton.Line className='w-40' />
        </div>
      </Skeleton>
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
