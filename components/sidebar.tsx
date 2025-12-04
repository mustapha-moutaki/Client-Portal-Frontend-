
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, FileText, Clipboard, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/app/contexts/auth-context"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth() // get logged-in user

  // Wait until user is loaded
  if (!user) return null

  // Define all possible menu items
  const menuItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/products", label: "Products", icon: Package },
    { href: "/staff", label: "Staff", icon: Users },
    { href: "/leads", label: "Leads", icon: FileText },
    { href: "/claims", label: "Claims", icon: Clipboard },
  ]

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter((item) => {
    if (user.role === "CLIENT") {
      // Clients cannot see Staff or Leads
      return item.href !== "/staff" && item.href !== "/leads"
    }
    return true // Other roles see everything
  })

  const isActive = (href: string) => pathname === href || pathname.startsWith(href)

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Dashboard</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60">© 2025 Dashboard</div>
      </div>
    </aside>
  )
}
