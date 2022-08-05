import { AddCommentForm } from 'components/AddCommentForm'
import { BackButton } from 'components/BackButton'
import { FeedbackInfoCard } from 'components/FeedbackInfoCard'
import { trpc } from 'lib/trpc'
import Image from 'next/image'
import Link from 'next/link'

type FeedbackDetailsTemplateProps = {
  feedbackId: number
  currentUser: string
}

export function FeedbackDetailsTemplate({
  feedbackId,
  currentUser
}: FeedbackDetailsTemplateProps) {
  const {
    data: feedback,
    error,
    isLoading
  } = trpc.useQuery([
    'feedback.get-feedback',
    {
      currentUser,
      feedbackId
    }
  ])

  const { data: comments = [] } = trpc.useQuery([
    'comment.get-comments',
    { feedbackId }
  ])

  function getCommentsHeader() {
    if (comments.length > 1) {
      return `${comments.length} Comments`
    }

    if (comments.length === 1) {
      return '1 Comment'
    }

    return 'No comments yet'
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className='p-6 pb-20 md:px-10 md:pb-28 md:pt-14 lg:m-auto lg:max-w-[730px] lg:px-0 lg:pt-20'>
      <div className='mb-6 flex justify-between'>
        <BackButton />
        <Link href={`/feedback/edit/${feedbackId}`}>
          <a className='flex h-10 items-center rounded-xl bg-blue-700 px-4 text-center text-body3 font-bold text-gray-200 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-500 disabled:opacity-80 md:h-11 md:px-6'>
            <span>Edit Feedback</span>
          </a>
        </Link>
      </div>

      {error && (
        <div className='flex rounded-xl bg-white p-6'>
          <p>Unable fetch the feedback information!</p>
        </div>
      )}

      {!!feedback && <FeedbackInfoCard feedback={feedback} />}

      <div className='my-6 rounded-xl bg-white p-6 md:p-8 md:pt-6'>
        <h2 className='text-heading3 font-bold text-gray-700'>
          {getCommentsHeader()}
        </h2>

        <ul>
          {comments.map(({ id, author, content }) => (
            <li
              key={`comment-${id}`}
              className='mt-6 border-b border-[#8C92B3] border-opacity-25 pb-6 last:border-b-0 last:pb-0 md:mt-8 md:pb-8 md:first:mt-7'
            >
              <div className='mb-4 flex items-center'>
                <Image
                  className='rounded-full'
                  src={
                    author.picture ??
                    '/assets/suggestions/tablet/background-header.png'
                  }
                  width={40}
                  height={40}
                  alt={`${author.name ?? author.username} profile`}
                />
                <div className='ml-4 flex flex-grow flex-col justify-center md:ml-8'>
                  {author.name && (
                    <span className='text-body3 font-bold text-gray-700 md:text-heading4'>
                      {author.name}
                    </span>
                  )}
                  <span className='text-body3 text-gray-500 md:text-heading4'>
                    @{author.username}
                  </span>
                </div>
                <button className='text-body3 font-semibold text-blue-700 hover:underline'>
                  Reply
                </button>
              </div>
              <p className='text-body3 text-gray-500 md:pl-18 md:text-body2'>
                {content}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className='rounded-xl bg-white p-6 md:px-8 md:pb-8'>
        <AddCommentForm feedbackId={feedbackId} />
      </div>
    </main>
  )
}
