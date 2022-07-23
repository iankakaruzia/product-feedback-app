import { createRouter } from 'server/utils/create-router'
import superjson from 'superjson'

export const appRouter = createRouter().transformer(superjson)

// export type definition of API
export type AppRouter = typeof appRouter
