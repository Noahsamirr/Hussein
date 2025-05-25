import React from 'react'
import Sidebar from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-950 dark:border-slate-800">
        <Sidebar />
      </div>
      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-0 left-0 z-30">
        <MobileSidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Navbar at the top */}
        <nav className="h-16 flex items-center px-4 border-b bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
          <NavbarRoutes />
        </nav>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  )
} 