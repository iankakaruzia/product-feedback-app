import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export function HeaderCard() {
  const { user } = useUser()

  return (
    <header className='hidden flex-col justify-end rounded-xl bg-suggestions-header-tablet bg-cover bg-no-repeat p-6 md:flex lg:h-[137px]'>
      <div className='self-end lg:hidden'>
        {user ? (
          <Link href='/api/auth/logout'>
            <a className='h-10 rounded-xl border border-white px-6 font-bold text-white transition-colors hover:border-opacity-80 hover:text-opacity-80'>
              Logout
            </a>
          </Link>
        ) : (
          <Link href='/api/auth/login'>
            <a className='h-10 rounded-xl border border-white px-6 font-bold text-white hover:border-opacity-80 hover:text-opacity-80'>
              Login
            </a>
          </Link>
        )}
      </div>
      <h1 className='mt-auto text-heading2 font-bold text-white'>
        Frontend Mentor
      </h1>
      <span className='text-body2 font-medium text-white text-opacity-75'>
        Feedback Board
      </span>
    </header>
  )
}
