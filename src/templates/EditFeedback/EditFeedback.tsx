import { trpc } from 'lib/trpc'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateFeedbackInput } from 'shared/inputs/feedback.inputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button } from 'components/Button'
import { FormInput } from 'components/FormInput'
import Image from 'next/image'
import { Select } from 'components/Select'
import { BackButton } from 'components/BackButton'
import { Category, Status } from 'models/feedback.model'

type EditFeedbackFormSchema = z.infer<typeof updateFeedbackInput>

function useEditFeedbackForm(defaultValues: EditFeedbackFormSchema) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<EditFeedbackFormSchema>({
    defaultValues,
    resolver: zodResolver(updateFeedbackInput)
  })

  const mutation = trpc.useMutation(['feedback.update-feedback'])

  const onSubmit = useCallback(
    (formValues: EditFeedbackFormSchema) => {
      mutation.mutate(formValues, {
        onSuccess: () => {
          reset()
          toast.success('Feedback successfully edited!')
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    },
    [mutation, reset]
  )

  return {
    isValid,
    errors,
    register,
    control,
    loading: mutation.isLoading,
    onSubmit: handleSubmit(onSubmit)
  }
}

type CategoryOption = {
  label: string
  value: Category
}

const categoriesOptions: CategoryOption[] = [
  { value: 'FEATURE', label: 'Feature' },
  { value: 'BUG', label: 'Bug' },
  { value: 'ENHANCEMENT', label: 'Enhancement' },
  { value: 'UI', label: 'UI' },
  { value: 'UX', label: 'UX' }
]

type StatusOption = {
  label: string
  value: Status
}

const statusOptions: StatusOption[] = [
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'LIVE', label: 'Live' },
  { value: 'PLANNED', label: 'Planned' },
  { value: 'SUGGESTION', label: 'Suggestion' }
]

type EditFeedbackTemplateProps = {
  feedbackId: number
  currentUser: string
}

export function EditFeedbackTemplate({
  feedbackId,
  currentUser
}: EditFeedbackTemplateProps) {
  const { back, replace } = useRouter()
  const { data: feedback, error } = trpc.useQuery([
    'feedback.get-feedback',
    {
      currentUser,
      feedbackId
    }
  ])
  const { data: me } = trpc.useQuery(['user.me'])
  const mutation = trpc.useMutation(['feedback.delete-feedback'])
  const { isValid, errors, register, control, loading, onSubmit } =
    useEditFeedbackForm({
      feedbackId,
      title: feedback?.title ?? '',
      category: feedback?.category ?? 'FEATURE',
      description: feedback?.description ?? '',
      status: feedback?.status ?? 'SUGGESTION'
    })

  async function deleteFeedback() {
    mutation.mutate(
      { feedbackId },
      {
        onSuccess: () => {
          replace('/')
          toast.success('Feedback successfully deleted!')
        }
      }
    )
  }

  const isLoading = loading || mutation.isLoading

  if (!feedback || error) {
    return <div>Feedback not found</div>
  }

  return (
    <div className='mx-auto max-w-[540px] px-6 pt-8 pb-18 md:pt-14'>
      <BackButton />

      <div className='relative mt-14 rounded-xl bg-white px-6 pt-11 pb-6'>
        <div className='absolute -top-7 left-6'>
          <Image
            src='/assets/shared/icon-edit-feedback.svg'
            alt=''
            width={56}
            height={56}
          />
        </div>
        <h1 className='mb-6 text-heading3 font-bold text-gray-700 md:mb-18'>
          Editing &apos;{feedback.title}&apos;
        </h1>

        <form onSubmit={onSubmit} className='flex flex-col'>
          <FormInput<EditFeedbackFormSchema>
            label='Feedback Title'
            helperText='Add a short, descriptive headline'
            id='title'
            name='title'
            className='mb-6'
            register={register}
            errors={errors}
          />

          <Select<EditFeedbackFormSchema>
            label='Category'
            helperText='Choose a category for your feedback'
            id='category'
            name='category'
            className='z-10 mb-6'
            control={control}
            errors={errors}
            options={categoriesOptions}
            defaultOption={categoriesOptions.find(
              (option) => option.value === feedback.category
            )}
          />

          <Select<EditFeedbackFormSchema>
            label='Update Status'
            helperText='Change feedback state (admin only)'
            id='status'
            name='status'
            className='mb-6'
            control={control}
            errors={errors}
            options={statusOptions}
            defaultOption={statusOptions.find(
              (option) => option.value === feedback.status
            )}
            disabled={me?.role !== 'ADMIN'}
          />

          <FormInput<EditFeedbackFormSchema>
            label='Feedback Detail'
            helperText='Include any specific comments on what should be improved, added, etc.'
            id='description'
            name='description'
            type='textarea'
            register={register}
            errors={errors}
          />
          <div className='mt-10 flex flex-col md:flex-row md:justify-end'>
            <Button
              type='submit'
              className='mb-4 md:order-3 md:m-0 md:ml-4'
              variant='primary'
              disabled={!isValid || isLoading}
            >
              Save Changes
            </Button>
            <Button
              type='button'
              className='mb-4 md:order-2 md:m-0'
              onClick={back}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='danger'
              className='md:order-1 md:mr-auto'
              disabled={isLoading}
              onClick={deleteFeedback}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
