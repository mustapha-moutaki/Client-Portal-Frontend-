"use client"
import Link from "next/link"
import { Package, Users, FileText, Clipboard } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Dashboard</h1>
              <p className="text-muted-foreground">Manage your business with ease</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/products" className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Package className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Products</h3>
                  <p className="text-sm text-muted-foreground">Manage product inventory</p>
                </div>
              </Link>

              <Link href="/staff" className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Staff</h3>
                  <p className="text-sm text-muted-foreground">Manage team members</p>
                </div>
              </Link>

              <Link href="/leads" className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <FileText className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Leads</h3>
                  <p className="text-sm text-muted-foreground">Track sales leads</p>
                </div>
              </Link>

              <Link href="/claims" className="group">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <Clipboard className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Claims</h3>
                  <p className="text-sm text-muted-foreground">Manage claims</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
