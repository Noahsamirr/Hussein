'use client'

import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const Logo = () => {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/teacher')

  if (isSignedIn && isDashboard) {
    return (
      <div className="flex items-center gap-x-4">
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-20 w-20 rounded-full border-8 border-blue-900 dark:border-blue-400 shadow-lg"
            }
          }}
        />
        <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
          {user?.firstName || user?.username || 'User'}
        </span>
      </div>
    )
  }

  return (
    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-600 dark:text-transparent dark:bg-clip-text dark:hover:text-white transition-all">
      HA
    </span>
  )
}
 
export default Logo 