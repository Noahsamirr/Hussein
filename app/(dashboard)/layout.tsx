// OLD DASHBOARD LAYOUT - DEPRECATED
// Use app/dashboard.tsx instead
import { Navbar } from './_components/navbar'
import Sidebar from './_components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col border-r bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 md:flex">
        <Sidebar />
      </div>
      <main className="mx-auto h-full max-w-7xl pt-[80px] px-4 md:pl-60 md:pr-4">
        <div className="h-full py-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
