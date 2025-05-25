import { NavbarRoutes } from '@/components/navbar-routes'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { SidebarRoutes } from '@/components/sidebar-routes'
import Logo from '@/components/logo'

interface DashboardProps {
  children: React.ReactNode
}

class Dashboard {
  private static instance: Dashboard
  private constructor() {}

  public static getInstance(): Dashboard {
    if (!Dashboard.instance) {
      Dashboard.instance = new Dashboard()
    }
    return Dashboard.instance
  }

  public renderLayout({ children }: DashboardProps) {
    return (
      <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="fixed inset-y-0 z-50 h-[80px] w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 md:pl-56">
          {this.renderNavbar()}
        </div>
        <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col border-r bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 md:flex">
          {this.renderSidebar()}
        </div>
        <main className="mx-auto h-full max-w-7xl pt-[80px] px-4 md:pl-60 md:pr-4">
          <div className="h-full py-6">
            {children}
          </div>
        </main>
      </div>
    )
  }

  private renderNavbar() {
    return (
      <div className="flex h-full items-center border-b bg-white dark:bg-slate-950 dark:border-slate-800 px-4 shadow-sm">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    )
  }

  private renderSidebar() {
    return (
      <div className="flex h-full flex-col overflow-y-auto border-r bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex w-full flex-col p-3">
          <SidebarRoutes />
        </div>
      </div>
    )
  }
}

// Export a singleton instance
export const dashboard = Dashboard.getInstance()

// Export a default layout component for easy use
export const DashboardLayout = ({ children }: DashboardProps) => {
  return dashboard.renderLayout({ children })
}

export default DashboardLayout 