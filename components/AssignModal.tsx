"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/contexts/auth-context"
import { Button } from "@/components/ui/button"

export function AssignModal({ isOpen, onClose, claimId }: { isOpen: boolean, onClose: () => void, claimId: string | null }) {
  const { token } = useAuth()
  const [operatorId, setOperatorId] = useState("")
  const [loading, setLoading] = useState(false)
  const [operators, setOperators] = useState<{ id: string, name: string }[]>([])

  useEffect(() => {
    if (!isOpen) return

    const fetchOperators = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/staff", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          const operatorUsers = (data.content || [])
            .filter((user: any) => user.role === "OPERATOR")
            .map((op: any) => ({ id: op.id, name: `${op.firstName} ${op.lastName}` }))
          setOperators(operatorUsers)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchOperators()
  }, [isOpen, token])

  const handleAssign = async () => {
    if (!claimId || !operatorId) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8080/api/claims/${claimId}/assign/${operatorId}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded shadow-lg w-96">
        <h3 className="font-bold text-lg mb-4">Assign Operator</h3>
        <div className="mb-4">
          <label className="block text-sm mb-2">Operator</label>
          <select
            className="w-full p-2 border rounded"
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
          >
            <option value="">Select Operator</option>
            {operators.map((op) => (
              <option key={op.id} value={op.id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleAssign} disabled={loading} className="flex-1">
            {loading ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </div>
    </div>
  )
}
