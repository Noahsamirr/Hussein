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
      <div className="flex flex-col items-start gap-y-2 p-3 border-b border-[#2d3446] w-full">
        <div className="flex items-center gap-x-2">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 border-2 border-[#f5f5f0]",
                userButtonPopoverCard: "bg-[#1a1f2e] border border-[#2d3446]",
                userButtonPopoverActionButton: "text-[#f5f5f0] hover:bg-[#2d3446]",
                userButtonPopoverFooter: "border-t border-[#2d3446]"
              }
            }}
          />
          <span className="text-sm font-medium text-[#f5f5f0]">
            {user?.firstName || user?.username || 'User'}
          </span>
        </div>
        <span className="text-xs text-[#a0aec0] pl-10">
          ID: {user?.id?.slice(0, 8)}...
        </span>
      </div>
    )
  }

  return (
    <div className="p-3 border-b border-[#2d3446] w-full">
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f0] to-[#a0aec0] dark:from-[#f5f5f0] dark:to-[#a0aec0] dark:text-transparent dark:bg-clip-text dark:hover:text-[#f5f5f0] transition-all">
        HA
      </span>
    </div>
  )
}
 
export default Logo 