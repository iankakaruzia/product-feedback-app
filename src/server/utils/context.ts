import { getSession } from '@auth0/nextjs-auth0'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from 'lib/prisma'

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req
  const res = opts?.res
  const session = req && res && getSession(req, res)

  return {
    req,
    res,
    session,
    prisma
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
