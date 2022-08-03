import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'
import { AddFeedbackTemplate } from 'templates/AddFeedback'

const AddFeedback: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create New Feedback</title>
      </Head>
      <AddFeedbackTemplate />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

export default AddFeedback
