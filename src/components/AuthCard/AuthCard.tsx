import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'

export function AuthCard() {
  const { user } = useUser()

  return (
    <div className='rounded-brand flex flex-col items-center bg-white p-6 md:hidden lg:flex'>
      {user ? (
        <div className='flex flex-col items-center'>
          <Image
            alt='profile'
            className='rounded-full'
            src={
              user.picture ?? '/assets/suggestions/tablet/background-header.png'
            }
            width={48}
            height={48}
          />
          <Link href='/api/auth/logout'>
            <a className='bg-brand-red-200 hover:bg-brand-red-100 mt-4 inline-flex items-center rounded py-1 px-3 text-white'>
              Logout
            </a>
          </Link>
        </div>
      ) : (
        <Link href='/api/auth/login'>
          <a className='bg-brand-purple-200 hover:bg-brand-purple-100 inline-flex items-center rounded py-1 px-3 text-white'>
            Login
          </a>
        </Link>
      )}
    </div>
  )
}
