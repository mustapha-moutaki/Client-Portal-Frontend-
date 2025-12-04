"use client"

import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/auth-context"

export function Header() {
  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back</p>
        {/* <h2 className="text-lg font-semibold text-foreground">{}</h2> */}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
