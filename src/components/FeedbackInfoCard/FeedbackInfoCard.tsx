import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import toast from 'react-hot-toast'

import { Badge } from 'components/Badge'
import { UpvoteButton } from 'components/UpvoteButton'
import { useFilterBy } from 'hooks/use-filter-by'
import { trpc } from 'lib/trpc'
import { Feedback, Status } from 'models/feedback.model'
import { formatCategory } from 'utils/functions/format-category'
import { classNames } from 'utils/styles/class-names'

type FeedbackInfoCardProps = {
  feedback: Feedback
  isClickable?: boolean
  showStatus?: boolean
}

const STATUS_COLORS: Record<Status, string> = {
  PLANNED: 'bg-orange-500',
  IN_PROGRESS: 'bg-purple-700',
  LIVE: 'bg-blue-300',
  SUGGESTION: 'bg-gray-700'
}

export function FeedbackInfoCard({
  feedback,
  isClickable = false,
  showStatus = false
}: FeedbackInfoCardProps) {
  const { user } = useUser()
  const { push } = useRouter()
  const { updateFilterByFromCategory } = useFilterBy()

  const upvoteMutation = trpc.useMutation(['upvote.update-upvote'])

  function goToDetails() {
    if (isClickable) {
      push(`/feedback/${feedback.id}`)
    }
  }

  function handleUpvote(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (!user) {
      toast.error('You must be logged in to upvote')
      return
    }

    upvoteMutation.mutate(
      { feedbackId: feedback.id },
      {
        onError: (error) => {
          console.error(error)
          toast.error('Failure to upvote')
        }
      }
    )
  }

  function handleBadgeClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    updateFilterByFromCategory(feedback.category)
    push({
      pathname: '/',
      query: {
        category: feedback.category.toLowerCase()
      }
    })
    return
  }

  return (
    <div
      role={isClickable ? 'button' : 'banner'}
      tabIndex={isClickable ? 0 : undefined}
      onClick={goToDetails}
      className={classNames(
        'relative rounded-xl bg-white p-6 md:flex md:items-start md:px-8 md:py-7',
        showStatus &&
          `before:absolute before:inset-x-0 before:top-0 before:h-[6px] before:${
            STATUS_COLORS[feedback.status]
          } before:rounded-tl-[5px] before:rounded-tr-[5px]`
      )}
    >
      <div className='md:order-1 md:pr-9'>
        <h1 className='mb-2 text-body3 font-bold text-gray-700'>
          {feedback.title}
        </h1>
        <p className='mb-2 text-body3 text-gray-500'>{feedback.description}</p>
        <Badge
          label={formatCategory(feedback.category)}
          className='mb-3 md:mb-0'
          onClick={handleBadgeClick}
        />
      </div>

      <div className='flex items-center justify-between md:mr-10'>
        <UpvoteButton
          count={feedback.upvotes.length}
          isActive={feedback.upvoted}
          onClick={handleUpvote}
          disabled={upvoteMutation.isLoading}
        />

        <div className='flex items-center md:absolute md:right-8 md:bottom-[calc(50%-14px)]'>
          <Image
            src='/assets/shared/icon-comments.svg'
            alt=''
            width={18}
            height={16}
          />
          <span className='ml-2 text-body3 font-bold text-gray-700'>
            {feedback.comments.length}
          </span>
        </div>
      </div>
    </div>
  )
}
