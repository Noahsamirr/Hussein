import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SideBar from './sidebar'

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Menu className="text-[#f5f5f0]" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[#1a1f2e] border-r border-[#2d3446]">
        <SideBar />
      </SheetContent>
    </Sheet>
  )
} 