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
    <div className='flex items-center justify-between mb-2'>
      <div className='flex items-center'>
        <div className={`w-2 h-2 rounded-full ${dotColor[type]} mr-4`} />
        <span className='text-body1 text-brand-dark-100'>{label}</span>
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
    <div className='bg-white mb-6 md:m-0 rounded-xl p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h4 className='text-heading3 font-bold text-gray-700'>Roadmap</h4>
        <Link href='/roadmap'>
          <a
            aria-disabled={hasNoItemsOnRoadmap}
            className={classNames(
              'text-body3 font-semibold transition-colors text-blue-700 hover:text-[#8397F8] underline',
              hasNoItemsOnRoadmap && 'text-opacity-25 pointer-events-none'
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
