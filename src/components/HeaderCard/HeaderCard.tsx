import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

export function HeaderCard() {
  const { user } = useUser()

  return (
    <header className='hidden md:flex flex-col justify-end rounded-xl bg-suggestions-header-tablet bg-no-repeat bg-cover p-6 lg:h-[137px]'>
      <div className='self-end lg:hidden'>
        {user ? (
          <Link href='/api/auth/logout'>
            <a className='text-white hover:text-opacity-80 border border-white hover:border-opacity-80 transition-colors rounded-xl font-bold px-6 h-10'>
              Logout
            </a>
          </Link>
        ) : (
          <Link href='/api/auth/login'>
            <a className='text-white hover:text-opacity-80 border border-white hover:border-opacity-80 rounded-xl font-bold px-6 h-10'>
              Login
            </a>
          </Link>
        )}
      </div>
      <h1 className='text-white mt-auto font-bold text-heading2'>
        Frontend Mentor
      </h1>
      <span className='text-white text-opacity-75 font-medium text-body2'>
        Feedback Board
      </span>
    </header>
  )
}
