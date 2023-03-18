import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { createSSGHelpers } from '@trpc/react/ssg'
import type { NextPage } from 'next'
import Head from 'next/head'
import superjson from 'superjson'
import { prisma } from 'lib/prisma'
import { appRouter } from 'server/routers'
import { EditFeedbackTemplate } from 'templates/EditFeedback'

type Props = {
  feedbackTitle: string
  feedbackId: number
  currentUser: string
}

const FeedbackEdit: NextPage<Props> = ({ feedbackTitle, ...rest }) => {
  return (
    <>
      <Head>
        <title>Edit Feedback: {feedbackTitle}</title>
      </Head>
      <EditFeedbackTemplate {...rest} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const { params, req, res } = context
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
        notFound: true
      }
    }

    const me = await ssg.fetchQuery('user.me')

    if (feedback.authorId === me.id || me.role === 'ADMIN') {
      return {
        props: {
          trpcState: ssg.dehydrate(),
          feedbackTitle: feedback.title,
          feedbackId: feedback.id,
          currentUser
        }
      }
    }

    return {
      notFound: true
    }
  }
})

export default FeedbackEdit
