// OLD DASHBOARD LAYOUT - DEPRECATED
// Use app/dashboard.tsx instead
import React from 'react'
import Sidebar from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { NavbarRoutes } from '@/components/navbar-routes'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-0 left-0 z-50">
        <MobileSidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0 md:pl-64">
        {/* Navbar at the top */}
        <nav className="h-16 flex items-center px-4 border-b bg-[#1a1f2e] border-[#2d3446] shadow-lg">
          <NavbarRoutes />
        </nav>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f5f5f0] dark:bg-[#1a1f2e]">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

