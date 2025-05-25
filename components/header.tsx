'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export const Header = () => {
  const { isSignedIn } = useAuth()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Hussein Abdulrahman
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isSignedIn ? (
            <Button asChild>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
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