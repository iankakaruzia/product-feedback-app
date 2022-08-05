import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { BackButton } from 'components/BackButton'
import { Button } from 'components/Button'
import { FormInput } from 'components/FormInput'
import { Select } from 'components/Select'
import { trpc } from 'lib/trpc'
import { Category } from 'models/feedback.model'
import { createFeedbackInput } from 'shared/inputs/feedback.inputs'

type AddFeedbackFormSchema = z.infer<typeof createFeedbackInput>

function useAddFeedbackForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<AddFeedbackFormSchema>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: 'FEATURE',
      description: ''
    },
    resolver: zodResolver(createFeedbackInput)
  })

  const mutation = trpc.useMutation(['feedback.create-feedback'])

  const onSubmit = useCallback(
    (formValues: AddFeedbackFormSchema) => {
      mutation.mutate(formValues, {
        onSuccess: () => {
          reset()
          toast.success('Feedback successfully added!')
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

export function AddFeedbackTemplate() {
  const { back } = useRouter()
  const { register, onSubmit, control, errors, isValid, loading } =
    useAddFeedbackForm()

  return (
    <div className='mx-auto max-w-[540px] px-6 pt-8 pb-18 md:pt-14'>
      <BackButton />

      <div className='relative mt-14 rounded-xl bg-white px-6 pt-11 pb-6'>
        <div className='absolute -top-7 left-6'>
          <Image
            src='/assets/shared/icon-new-feedback.svg'
            alt=''
            width={56}
            height={56}
          />
        </div>

        <h1 className='mb-6 text-heading3 font-bold text-gray-700 md:mb-10'>
          Create New Feedback
        </h1>

        <form onSubmit={onSubmit} className='flex flex-col'>
          <FormInput<AddFeedbackFormSchema>
            label='Feedback Title'
            helperText='Add a short, descriptive headline'
            id='title'
            name='title'
            className='mb-6'
            register={register}
            errors={errors}
          />

          <Select<AddFeedbackFormSchema>
            label='Category'
            helperText='Choose a category for your feedback'
            id='category'
            name='category'
            className='mb-6'
            control={control}
            errors={errors}
            options={categoriesOptions}
          />

          <FormInput<AddFeedbackFormSchema>
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
              className='mb-4 md:order-2 md:m-0 md:ml-4'
              variant='primary'
              disabled={!isValid || loading}
            >
              Add Feedback
            </Button>
            <Button onClick={back}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
