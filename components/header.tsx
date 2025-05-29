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
      className="fixed top-0 z-50 w-full border-b bg-[#1a1f2e]/80 backdrop-blur-sm border-[#2d3446]"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo />
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f0] to-[#a0aec0] dark:from-[#f5f5f0] dark:to-[#a0aec0] dark:text-transparent dark:bg-clip-text dark:hover:text-[#f5f5f0] transition-all ml-1">
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