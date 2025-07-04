'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Logo from '@/components/logo'

export const Header = () => {
  const { isSignedIn } = useAuth()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100 ml-2">
            Hussein Abdulrahman
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {isSignedIn ? (
            <Button asChild size="sm">
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
} 