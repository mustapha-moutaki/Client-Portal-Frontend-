"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
// 1. Import Context
import { useAuth } from "@/app/contexts/auth-context"

const ROLES = ["ADMIN", "SUPERVISOR", "OPERATOR", "CLIENT"]

interface StaffMember {
  id: number
  firstName: string
  lastName: string
  role: string
}

interface StaffModalProps {
  isOpen: boolean
  onClose: () => void
  staffMember?: StaffMember | null
}

export function StaffModal({ isOpen, onClose, staffMember }: StaffModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "OPERATOR",
  })
  const [loading, setLoading] = useState(false)

  // 2. Get Token
  const { token } = useAuth()

  useEffect(() => {
    if (staffMember) {
      setFormData({
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        username: "", 
        email: "",
        password: "",
        role: staffMember.role || "OPERATOR",
      })
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        role: "OPERATOR",
      })
    }
  }, [staffMember, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = staffMember ? "PUT" : "POST"
      const url = staffMember
        ? `http://localhost:8080/api/staff/${staffMember.id}`
        : "http://localhost:8080/api/staff"

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role, 
        supervisorId: 0 
      }

      const response = await fetch(url, {
        method,
        headers: { 
            "Content-Type": "application/json",
            // 3. Add Authorization Header
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        onClose()
      } else {
        console.error("Failed to save staff")
      }
    } catch (error) {
      console.error("Error saving staff:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {staffMember ? "Edit Staff" : "Add Staff Member"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              required={!staffMember} 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}