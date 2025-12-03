"use client"

import type React from "react"
// ✅ 1. استيراد الكونتكست بشكل صحيح
import { useAuth } from "@/app/contexts/auth-context" 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Claim {
  id: string
  title: string
  description: string
  amount: number
  status: string
  claimDate?: string
}

interface ClaimModalProps {
  isOpen: boolean
  onClose: () => void
  claim?: Claim | null
}

export function ClaimModal({ isOpen, onClose, claim }: ClaimModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    status: "pending",
    claimDate: "",
  })
  const [loading, setLoading] = useState(false)

  // ✅ 2. استخراج التوكن من الكونتكست
  const { token } = useAuth()

  useEffect(() => {
    if (claim) {
      setFormData({
        title: claim.title,
        description: claim.description,
        amount: claim.amount.toString(),
        status: claim.status,
        claimDate: claim.claimDate || "",
      })
    } else {
      setFormData({ title: "", description: "", amount: "", status: "pending", claimDate: "" })
    }
  }, [claim])

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = claim ? "PUT" : "POST"
      const url = claim 
        ? `http://localhost:8080/api/claims/${claim.id}` 
        : "http://localhost:8080/api/claims"

   
      const payload = {
        clientId: 1, 
        title: formData.title,
        description: formData.description,
        amount: Number.parseFloat(formData.amount),
        status: formData.status.toUpperCase(), 
        claimDate: formData.claimDate || new Date().toISOString().split('T')[0],
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
        console.error("Failed to save claim")
      }
    } catch (error) {
      console.error("Error saving claim:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{claim ? "Edit Claim" : "Create Claim"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Claim Date</label>
            <input
              type="date"
              value={formData.claimDate}
              onChange={(e) => setFormData({ ...formData, claimDate: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}