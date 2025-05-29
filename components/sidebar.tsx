import Logo from './logo'
import { SidebarRoutes } from './sidebar-routes'

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-[#1a1f2e] dark:bg-[#1a1f2e] border-[#2d3446] shadow-lg">
      <div className="p-6 border-b border-[#2d3446]">
        <Logo />
      </div>
      <div className="flex w-full flex-col p-4">
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar 