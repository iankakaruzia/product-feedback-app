import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'

import { appRouter } from 'server/routers'
import { prisma } from 'lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { FeedbackDetailsTemplate } from 'templates/FeedbackDetails'

type Props = {
  feedbackTitle: string
  feedbackId: number
  currentUser: string
}

const FeedbackDetails: NextPage<Props> = ({
  feedbackTitle,
  feedbackId,
  currentUser
}) => {
  return (
    <>
      <Head>
        <title>Feedback: {feedbackTitle}</title>
      </Head>
      <FeedbackDetailsTemplate
        feedbackId={feedbackId}
        currentUser={currentUser}
      />
    </>
  )
}

export async function getServerSideProps({
  req,
  res,
  params
}: GetServerSidePropsContext) {
  const session = getSession(req, res)
  const currentUser = session?.user?.email ?? ''

  if (
    !params?.id ||
    Array.isArray(params.id) ||
    Number.isNaN(parseInt(params.id))
  ) {
    return {
      notFound: true
    }
  }

  const ssg = createSSGHelpers({
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: { req: req as any, res: res as any, prisma, session },
    transformer: superjson
  })

  const feedback = await ssg.fetchQuery('feedback.get-feedback', {
    currentUser,
    feedbackId: parseInt(params.id)
  })

  if (!feedback) {
    return {
      notFound: true,
      props: {}
    }
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      feedbackTitle: feedback.title,
      feedbackId: feedback.id,
      currentUser
    }
  }
}

export default FeedbackDetails
