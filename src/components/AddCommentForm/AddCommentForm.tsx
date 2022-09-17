import { useUser } from '@auth0/nextjs-auth0'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { trpc } from 'lib/trpc'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createCommentInput } from 'shared/inputs/comments.inputs'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem
} from 'utils/local-storage/local-storage.utils'
import { z } from 'zod'

type AddCommentFormSchema = z.infer<typeof createCommentInput>

function useAddCommentForm(feedbackId: number, currentUser: string) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<AddCommentFormSchema>({
    defaultValues: {
      content: '',
      feedbackId
    },
    resolver: zodResolver(createCommentInput)
  })
  const utils = trpc.useContext()
  const mutation = trpc.useMutation(['comment.create-comment'], {
    onSuccess: () => {
      utils.invalidateQueries(['comment.get-comments', { feedbackId }])
      utils.invalidateQueries([
        'feedback.get-feedback',
        { feedbackId, currentUser }
      ])
    }
  })

  const onSubmit = useCallback(
    ({ content }: AddCommentFormSchema) => {
      mutation.mutate(
        { content, feedbackId },
        {
          onSuccess: () => {
            reset()
            toast.success('Comment successfully added!')
          },
          onError: (error) => {
            toast.error(`Something went wrong: ${error.message}`)
          }
        }
      )
    },
    [feedbackId, mutation, reset]
  )

  return {
    errors,
    control,
    loading: mutation.isLoading,
    onSubmit: handleSubmit(onSubmit)
  }
}

type AddCommentFormProps = {
  feedbackId: number
}

const LIMIT = 250

export function AddCommentForm({ feedbackId }: AddCommentFormProps) {
  const COMMENT_LOCAL_STORAGE_KEY = `comment_${feedbackId}`
  const { user } = useUser()
  const { push } = useRouter()
  const { onSubmit, loading, control, errors } = useAddCommentForm(
    feedbackId,
    user?.email ?? ''
  )
  const [currentContent, setCurrentContent] = useState('')

  useEffect(() => {
    const storeContent = getStorageItem(COMMENT_LOCAL_STORAGE_KEY)
    if (storeContent) {
      setCurrentContent(storeContent)
      removeStorageItem(COMMENT_LOCAL_STORAGE_KEY)
    }
  }, [COMMENT_LOCAL_STORAGE_KEY])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!user) {
      return
    }

    onSubmit(event)
    setCurrentContent('')
  }

  function handleClick() {
    if (!user) {
      if (currentContent.length > 0) {
        setStorageItem(COMMENT_LOCAL_STORAGE_KEY, currentContent)
      }
      push(`/api/auth/login?returnTo=/feedback/${feedbackId}`)
      return
    }
  }

  const shouldDisableButton = user ? loading : false

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='mb-6 text-heading3 font-bold text-gray-700'>
        Add Comment
      </h3>

      <Controller
        control={control}
        name='content'
        render={({ field: { onChange, value } }) => (
          <textarea
            className='min-h-[80px] w-full resize-y rounded-md border-none bg-gray-100 text-body2 text-gray-700 placeholder:text-body3 placeholder:text-[#8C92B3] focus:border-blue-700 focus:ring-1'
            placeholder='Type your comment here'
            value={value || currentContent}
            onChange={(e) => {
              const finalValue = e.target.value.slice(0, LIMIT)
              e.target.value = finalValue
              onChange(e)
              setCurrentContent(finalValue)
            }}
          />
        )}
      />
      {errors.content && (
        <span className='text-heading4 text-red-500'>
          {errors.content.message}
        </span>
      )}

      <div className='mt-4 flex items-center justify-between'>
        <span className='text-body3 text-gray-500'>
          {LIMIT - currentContent.length} Characters left
        </span>
        <Button
          type='submit'
          variant='primary'
          disabled={shouldDisableButton}
          onClick={handleClick}
        >
          {user ? 'Post Comment' : 'Login to Comment'}
        </Button>
      </div>
    </form>
  )
}
