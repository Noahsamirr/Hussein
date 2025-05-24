import Logo from './logo'
import { SidebarRoutes } from './sidebar-routes'

const Sidebar = () => {
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

export default Sidebar
