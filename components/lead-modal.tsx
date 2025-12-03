"use client"

import type React from "react"
import { useAuth } from "@/app/contexts/auth-context" 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// Interface for Staff (to populate dropdown)
interface Staff {
  id: number
  firstName: string
  lastName: string
  role: string
}

// Interface for Lead
interface Lead {
  id: string
  name: string
  contactInfo: string 
  source: string    
  status: string
  notes?: string
  assignedOperatorId?: number
}

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead?: Lead | null
}

export function LeadModal({ isOpen, onClose, lead }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    source: "",
    status: "NEW", 
    notes: "",
    assignedOperatorId: "",
  })
  
  const [operators, setOperators] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)

  const { token } = useAuth()

  // 1. Fetch Operators when modal opens
  useEffect(() => {
    if (isOpen && token) {
      fetchOperators()
    }
  }, [isOpen, token])

  const fetchOperators = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/staff", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        const allStaff: Staff[] = data.content || []
        // Filter: Only show OPERATORs
        const ops = allStaff.filter(s => s.role === "OPERATOR")
        setOperators(ops)
      }
    } catch (error) {
      console.error("Error fetching operators:", error)
    }
  }

  // 2. Populate form if editing
  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        contactInfo: lead.contactInfo,
        source: lead.source,
        status: lead.status, // Assuming backend sends uppercase
        notes: lead.notes || "",
        assignedOperatorId: lead.assignedOperatorId ? lead.assignedOperatorId.toString() : "",
      })
    } else {
      setFormData({ 
        name: "", 
        contactInfo: "", 
        source: "", 
        status: "NEW", 
        notes: "",
        assignedOperatorId: ""
      })
    }
  }, [lead])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = lead ? "PUT" : "POST"
      const url = lead ? `http://localhost:8080/api/leads/${lead.id}` : "http://localhost:8080/api/leads"

      const payload = {
        name: formData.name,
        contactInfo: formData.contactInfo,
        source: formData.source,
        notes: formData.notes,
        status: formData.status, // Already Uppercase from select
        assignedOperatorId: formData.assignedOperatorId ? Number(formData.assignedOperatorId) : null
      }

      const response = await fetch(url, {
        method,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        onClose()
      } else {
        console.error("Failed to save lead")
      }
    } catch (error) {
      console.error("Error saving lead:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{lead ? "Edit Lead" : "Add Lead"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Contact Info</label>
            <input
              type="text"
              required
              placeholder="Email or Phone"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Source</label>
            <input
              type="text"
              required
              placeholder="e.g. LinkedIn, Website"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          {/* Assigned Operator */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Assign Operator</label>
            <select
              value={formData.assignedOperatorId}
              onChange={(e) => setFormData({ ...formData, assignedOperatorId: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">-- Unassigned --</option>
              {operators.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.firstName} {op.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Status - Matches Java Enum Exactly */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="LOST">Lost</option>
              <option value="CONVERTED">Converted</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" type="button" onClick={onClose} className="flex-1 bg-transparent">
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