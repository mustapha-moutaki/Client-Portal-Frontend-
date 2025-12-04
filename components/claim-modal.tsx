// "use client"

// import type React from "react"
// import { useAuth } from "@/app/contexts/auth-context" 
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { X, Upload } from "lucide-react"

// interface Claim {
//   id: string
//   title: string
//   description: string
//   amount: number
//   status: string
//   claimDate?: string
// }

// interface ClaimModalProps {
//   isOpen: boolean
//   onClose: () => void
//   claim?: Claim | null
// }

// export function ClaimModal({ isOpen, onClose, claim }: ClaimModalProps) {
//   const { token, user } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [file, setFile] = useState<File | null>(null) // New State for File

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     amount: "",
//     status: "SUBMITTED",
//     claimDate: "",
//   })

//   // Role Checks
//   const isClient = user?.role === 'CLIENT';
//   const isStaff = ['ADMIN', 'SUPERVISOR', 'OPERATOR'].includes(user?.role || '');

//   useEffect(() => {
//     if (claim) {
//       setFormData({
//         title: claim.title,
//         description: claim.description,
//         amount: claim.amount.toString(),
//         status: claim.status,
//         claimDate: claim.claimDate || "",
//       })
//     } else {
//       setFormData({ title: "", description: "", amount: "", status: "SUBMITTED", claimDate: "" })
//     }
//   }, [claim])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const isUpdate = !!claim;
//       const url = isUpdate 
//         ? `http://localhost:8080/api/claims/${claim.id}` 
//         : "http://localhost:8080/api/claims"

//       const method = isUpdate ? "PUT" : "POST"

//       // ---------------------------------------------------------
//       // IMPORTANT: If Creating (Client), use Multipart/Form-Data
//       // If Updating (Staff), usually just JSON is enough unless re-uploading
//       // ---------------------------------------------------------

//       let body: any;
//       const headers: any = { "Authorization": `Bearer ${token}` };

//       if (!isUpdate) {
//         // --- CREATION (Multipart) ---
//         const data = new FormData();
        
//         // 1. Create the JSON part
//         const jsonPayload = {
//           title: formData.title,
//           description: formData.description,
//           amount: Number.parseFloat(formData.amount),
//           status: formData.status, // Usually ignored by backend for Clients
//           claimDate: formData.claimDate || new Date().toISOString().split('T')[0],
//         };

//         // 2. Append as specific type
//         data.append("claim", new Blob([JSON.stringify(jsonPayload)], { type: "application/json" }));

//         // 3. Append File if exists
//         if (file) {
//           data.append("file", file);
//         }
        
//         // Note: Do NOT set Content-Type header manually for FormData, browser does it with boundary
//         body = data; 

//       } else {
//         // --- UPDATE (JSON) ---
//         headers["Content-Type"] = "application/json";
        
//         // Special logic: If Operator, they might just want to change Status
//         // For simplicity, we send the whole object here
//         body = JSON.stringify({
//           title: formData.title,
//           description: formData.description,
//           amount: Number.parseFloat(formData.amount),
//           status: formData.status,
//           claimDate: formData.claimDate,
//         });
//       }

//       const response = await fetch(url, { method, headers, body })

//       if (response.ok) {
//         onClose()
//       } else {
//         console.error("Failed")
//       }
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex items-center justify-between p-6 border-b border-border">
//           <h2 className="text-lg font-semibold">{claim ? "Edit Claim" : "New Claim"}</h2>
//           <button onClick={onClose}><X className="w-5 h-5" /></button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
//           {/* Title & Description (Editable by Client on Create, or Staff on Edit) */}
//           <div>
//              <label className="block text-sm font-medium mb-1">Title</label>
//              <input className="w-full p-2 border rounded" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
//           </div>
//           <div>
//              <label className="block text-sm font-medium mb-1">Description</label>
//              <textarea className="w-full p-2 border rounded" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
//           </div>

//           {/* Amount */}
//           <div>
//              <label className="block text-sm font-medium mb-1">Amount</label>
//              <input type="number" step="0.01" className="w-full p-2 border rounded" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
//           </div>

//           {/* FILE UPLOAD (Only for Create / Client) */}
//           {!claim && (
//             <div>
//               <label className="block text-sm font-medium mb-1">Attachment (PDF/Image)</label>
//               <div className="border border-dashed p-4 rounded flex items-center justify-center">
//                  <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
//               </div>
//             </div>
//           )}

//           {/* STATUS: Only visible to Staff (Admins/Operators) */}
//           {isStaff && (
//             <div>
//               <label className="block text-sm font-medium mb-1 text-blue-600">Workflow Status</label>
//               <select 
//                 className="w-full p-2 border rounded bg-blue-50" 
//                 value={formData.status} 
//                 onChange={e => setFormData({...formData, status: e.target.value})}
//               >
//                 <option value="SUBMITTED">Submitted</option>
//                 <option value="IN_REVIEW">In Review</option>
//                 <option value="RESOLVED">Resolved</option>
//               </select>
//             </div>
//           )}

//           <div className="flex gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
//             <Button type="submit" disabled={loading} className="flex-1">
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useAuth } from "@/app/contexts/auth-context" 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload } from "lucide-react"

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
  const { token, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    status: "SUBMITTED",
    claimDate: "",
  })

  // Role Checks
  const isClient = user?.role === 'CLIENT'
  const isStaff = ['ADMIN', 'SUPERVISOR', 'OPERATOR'].includes(user?.role || '')

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
      setFormData({ title: "", description: "", amount: "", status: "SUBMITTED", claimDate: "" })
      setFile(null)
    }
  }, [claim])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const isUpdate = !!claim
      const url = isUpdate 
        ? `http://localhost:8080/api/claims/${claim.id}` 
        : "http://localhost:8080/api/claims"

      const method = isUpdate ? "PUT" : "POST"
      let body: any
      const headers: any = { "Authorization": `Bearer ${token}` }

      if (!isUpdate) {
        // --- CREATION (Multipart/Form-Data) ---
        const data = new FormData()

       const jsonPayload = {
    title: formData.title,
    description: formData.description,
    amount: Number.parseFloat(formData.amount),
    status: formData.status,
    claimDate: formData.claimDate || new Date().toISOString().split('T')[0],
    fileUrl: null 
  };


        data.append("claim", new Blob([JSON.stringify(jsonPayload)], { type: "application/json" }))

        if (file) {
          data.append("file", file)
        }

        body = data // browser sets Content-Type automatically
      } else {
        // --- UPDATE (JSON) ---
        headers["Content-Type"] = "application/json"
        body = JSON.stringify({
          title: formData.title,
          description: formData.description,
          amount: Number.parseFloat(formData.amount),
          status: formData.status,
          claimDate: formData.claimDate,
        })
      }

      const response = await fetch(url, { method, headers, body })

      if (response.ok) {
        onClose()
      } else {
        console.error("Failed to save claim")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">{claim ? "Edit Claim" : "New Claim"}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              className="w-full p-2 border rounded" 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              className="w-full p-2 border rounded" 
              rows={3} 
              required 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input 
              type="number" 
              step="0.01" 
              className="w-full p-2 border rounded" 
              required 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
            />
          </div>

          {!claim && (
            <div>
              <label className="block text-sm font-medium mb-1">Attachment (PDF/Image)</label>
              <div className="border border-dashed p-4 rounded flex flex-col items-center justify-center">
                <input 
                  type="file" 
                  accept=".pdf, image/*" 
                  onChange={e => setFile(e.target.files?.[0] || null)} 
                />
                {file && <p className="text-sm mt-1 text-muted-foreground">{file.name}</p>}
              </div>
            </div>
          )}

          {isStaff && (
            <div>
              <label className="block text-sm font-medium mb-1 text-blue-600">Workflow Status</label>
              <select 
                className="w-full p-2 border rounded bg-blue-50" 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="SUBMITTED">Submitted</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
