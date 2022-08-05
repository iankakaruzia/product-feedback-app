import Link from 'next/link'

import { trpc } from 'lib/trpc'
import { classNames } from 'utils/styles/class-names'

type RoadmapItemProps = {
  label: string
  value: number
  type: 'live' | 'inProgress' | 'planned'
}

function RoadmapItem({ label, value, type }: RoadmapItemProps) {
  const dotColor = {
    live: 'bg-blue-300',
    inProgress: 'bg-purple-700',
    planned: 'bg-orange-500'
  }

  return (
    <div className='mb-2 flex items-center justify-between'>
      <div className='flex items-center'>
        <div className={`h-2 w-2 rounded-full ${dotColor[type]} mr-4`} />
        <span className='text-brand-dark-100 text-body1'>{label}</span>
      </div>
      <span className='text-body1 font-bold text-gray-500'>{value}</span>
    </div>
  )
}

export function RoadmapSummaryCard() {
  const { data } = trpc.useQuery(['feedback.get-roadmap-items'])
  const hasNoItemsOnRoadmap =
    !data || !data.inProgress || !data.live || !data.planned

  return (
    <div className='mb-6 rounded-xl bg-white p-6 md:m-0'>
      <div className='mb-6 flex items-center justify-between'>
        <h4 className='text-heading3 font-bold text-gray-700'>Roadmap</h4>
        <Link href='/roadmap'>
          <a
            aria-disabled={hasNoItemsOnRoadmap}
            className={classNames(
              'text-body3 font-semibold text-blue-700 underline transition-colors hover:text-[#8397F8]',
              hasNoItemsOnRoadmap && 'pointer-events-none text-opacity-25'
            )}
          >
            View
          </a>
        </Link>
      </div>
      <RoadmapItem label='Planned' type='planned' value={data?.planned ?? 0} />
      <RoadmapItem
        label='In Progress'
        type='inProgress'
        value={data?.inProgress ?? 0}
      />
      <RoadmapItem label='Live' type='live' value={data?.live ?? 0} />
    </div>
  )
}
