"use client"

import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { getFlatmates } from "@/lib/data"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { Flatmate } from "@/lib/types"

export default function AppSidebar() {
  const pathname = usePathname()
  const [flatmates, setFlatmates] = useState<Flatmate[]>([])

  useEffect(() => {
    async function loadFlatmates() {
      const data = await getFlatmates()
      setFlatmates(data)
    }
    loadFlatmates()
  }, [])

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-14 md:h-16 flex items-center px-3 md:px-4 border-b border-sidebar-border">
        <h1 className="text-base md:text-lg font-semibold">ChoreBoard</h1>
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center px-3 md:px-4 py-3 md:py-4">
        {/* Home link - centered */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 w-full p-2 rounded-md transition-colors mb-4 md:mb-6",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            pathname === "/" ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "",
          )}
        >
          <Home className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
          <span>Home</span>
        </Link>

        <div className="w-full">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Flatmates</h2>

          <div className="flex flex-col gap-2">
            {flatmates.map((flatmate) => (
              <Link
                key={flatmate.id}
                href={`/flatmates/${flatmate.id}`}
                className={cn(
                  "flex items-center gap-2 w-full p-2 rounded-md transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === `/flatmates/${flatmate.id}`
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "",
                )}
              >
                <Avatar className="h-5 w-5 md:h-6 md:w-6">
                  {flatmate.profilePic ? (
                    <AvatarImage 
                      src={`data:image/jpeg;base64,${flatmate.profilePic}`} 
                      alt={flatmate.name} 
                    />
                  ) : (
                    <AvatarFallback>{flatmate.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <span className="truncate">{flatmate.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

