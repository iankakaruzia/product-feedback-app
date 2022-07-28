import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import Link from 'next/link'

export function AuthCard() {
  const { user } = useUser()

  return (
    <div className='bg-white flex flex-col items-center rounded-brand p-6 md:hidden lg:flex'>
      {user ? (
        <div className='flex items-center flex-col'>
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
            <a className='inline-flex items-center text-white bg-brand-red-200 py-1 px-3 hover:bg-brand-red-100 rounded mt-4'>
              Logout
            </a>
          </Link>
        </div>
      ) : (
        <Link href='/api/auth/login'>
          <a className='inline-flex items-center text-white bg-brand-purple-200 py-1 px-3 hover:bg-brand-purple-100 rounded'>
            Login
          </a>
        </Link>
      )}
    </div>
  )
}
