"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { StaffModal } from "@/components/staff-modal"
// 1. Import Auth Context
import { useAuth } from "@/app/contexts/auth-context"

interface Staff {
  id: number
  firstName: string
  lastName: string
  role: string
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  // 2. Get Token
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetchStaff()
    }
  }, [token])

const fetchStaff = async () => {
  try {
    setLoading(true)
    const response = await fetch("http://localhost:8080/api/staff", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error("Failed to fetch staff:", data)
      setStaff([])
      return
    }

    setStaff(data.content || [])
  } catch (error) {
    console.error("Error fetching staff:", error)
    setStaff([])
  } finally {
    setLoading(false)
  }
}


  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      try {
        await fetch(`http://localhost:8080/api/staff/${id}`, {
          method: "DELETE",
          // 4. Add Authorization Header for delete
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setStaff((prev) => prev.filter((s) => s.id !== id))
      } catch (error) {
        console.error("Error deleting staff:", error)
      }
    }
  }

  const handleEdit = (member: Staff) => {
    setEditingStaff(member)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingStaff(null)
    fetchStaff()
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Staff Management</h1>
                <p className="text-muted-foreground">Manage your team members</p>
              </div>
              <Button onClick={() => setShowModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Staff
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading staff...</p>
              </div>
            ) : staff.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">No staff members found</p>
                <Button onClick={() => setShowModal(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add First Staff Member
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Full Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                         <td className="px-6 py-4 text-sm text-muted-foreground">#{member.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground font-medium">
                          {member.firstName} {member.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                           <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                             {member.role}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="gap-1">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(member.id)}
                            className="gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      <StaffModal isOpen={showModal} onClose={handleCloseModal} staffMember={editingStaff} />
    </div>
  )
}