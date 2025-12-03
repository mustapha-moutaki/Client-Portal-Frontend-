"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
// ✅ 1. استيراد الكونتكست
import { useAuth } from "@/app/contexts/auth-context"

const PRODUCT_TYPES = ["INSURANCE", "REAL_ESTATE", "SERVICE"]

interface Product {
  id: string
  name: string
  basePrice: number 
  description: string
  type: string     
  createdAt: string
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "", 
    description: "",
    type: "INSURANCE",
  })
  const [loading, setLoading] = useState(false)

  // ✅ 2. الحصول على التوكن
  const { token } = useAuth()

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        basePrice: product.basePrice ? product.basePrice.toString() : "",
        description: product.description || "",
        type: product.type || "INSURANCE",
      })
    } else {
      setFormData({ 
        name: "", 
        basePrice: "", 
        description: "", 
        type: "INSURANCE" 
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = product ? "PUT" : "POST"
      const url = product 
        ? `http://localhost:8080/api/products/${product.id}` 
        : "http://localhost:8080/api/products"

      const payload = {
        name: formData.name,
        basePrice: Number.parseFloat(formData.basePrice),
        description: formData.description,
        type: formData.type,
      }

      const response = await fetch(url, {
        method,
        headers: { 
            "Content-Type": "application/json",
            // ✅ 3. إضافة التوكن في الهيدر
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        onClose()
      } else {
        console.error("Failed to save product")
      }
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {product ? "Edit Product" : "Create Product"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Base Price</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Product Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
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