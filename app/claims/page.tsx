// "use client"

// import { useEffect, useState } from "react"
// import { Sidebar } from "@/components/sidebar"
// import { Header } from "@/components/header"
// import { Button } from "@/components/ui/button"
// import { Plus, Edit, Trash2 } from "lucide-react"
// import { ClaimModal } from "@/components/claim-modal"

// import { useAuth } from "@/app/contexts/auth-context"

// interface Claim {
//   id: string
//   title: string
//   amount: number
//   status: string
//   claimDate?: string
// }

// export default function ClaimsPage() {
//   const [claims, setClaims] = useState<Claim[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingClaim, setEditingClaim] = useState<Claim | null>(null)

//   // 2. الحصول على التوكن من الكونتكست
//   const { token } = useAuth()

//   useEffect(() => {
//     // لن نجلب البيانات إلا إذا كان التوكن موجوداً
//     if (token) {
//       fetchClaims()
//     }
//   }, [token]) // إعادة التشغيل عند تغير التوكن

//   const fetchClaims = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch("http://localhost:8080/api/claims", {
//         // 3. إضافة الهيدر هنا
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       })
      
//       if (response.ok) {
//         const data = await response.json()
//         setClaims(data.content || data.claims || [])
//       } else {
//         console.error("Failed to fetch claims")
//       }
//     } catch (error) {
//       console.error("Error fetching claims:", error)
//       setClaims([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this claim?")) {
//       try {
//         await fetch(`http://localhost:8080/api/claims/${id}`, {
//           method: "DELETE",
//           // 4. لا تنس إضافة الهيدر في الحذف أيضاً!
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         })
//         setClaims(claims.filter((c) => c.id !== id))
//       } catch (error) {
//         console.error("Error deleting claim:", error)
//       }
//     }
//   }

//   const handleEdit = (claim: Claim) => {
//     setEditingClaim(claim)
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingClaim(null)
//     fetchClaims()
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-auto">
//           <div className="p-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h1 className="text-3xl font-bold text-foreground mb-2">Claims</h1>
//                 <p className="text-muted-foreground">Manage customer claims</p>
//               </div>
//               <Button onClick={() => setShowModal(true)} className="gap-2">
//                 <Plus className="w-4 h-4" />
//                 Create Claim
//               </Button>
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <p className="text-muted-foreground">Loading claims...</p>
//               </div>
//             ) : claims.length === 0 ? (
//               <div className="bg-card border border-border rounded-lg p-8 text-center">
//                 <p className="text-muted-foreground mb-4">No claims found</p>
//                 <Button onClick={() => setShowModal(true)} className="gap-2">
//                   <Plus className="w-4 h-4" />
//                   Create First Claim
//                 </Button>
//               </div>
//             ) : (
//               <div className="bg-card border border-border rounded-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-border bg-muted/50">
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {claims.map((claim) => (
//                       <tr key={claim.id} className="border-b border-border hover:bg-muted/30 transition-colors">
//                         <td className="px-6 py-4 text-sm text-foreground">{claim.title}</td>
//                         <td className="px-6 py-4 text-sm text-foreground">${claim.amount}</td>
//                         <td className="px-6 py-4 text-sm">
//                           <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
//                             {claim.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-muted-foreground">
//                           {claim.claimDate ? new Date(claim.claimDate).toLocaleDateString() : "-"}
//                         </td>
//                         <td className="px-6 py-4 text-sm flex gap-2">
//                           <Button variant="outline" size="sm" onClick={() => handleEdit(claim)} className="gap-1">
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleDelete(claim.id)}
//                             className="gap-1 text-destructive"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       <ClaimModal isOpen={showModal} onClose={handleCloseModal} claim={editingClaim} />
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, UserPlus, FileText } from "lucide-react" // Added UserPlus
import { ClaimModal } from "@/components/claim-modal"
import { AssignModal } from "@/components/AssignModal" 
import { useAuth } from "@/app/contexts/auth-context"

interface Claim {
  id: string
  title: string
  amount: number
  status: string
  claimDate?: string
  clientName?: string // Optional: useful for Admin to see who created it
  assignedOperatorName?: string // Optional
}

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null)
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null)

  const { token, user } = useAuth() 

  // --- ROLE CHECKERS ---
  const isAdmin = user?.role === 'ADMIN';
  const isSupervisor = user?.role === 'SUPERVISOR';
  const isOperator = user?.role === 'OPERATOR';
  const isClient = user?.role === 'CLIENT';

  const canCreate = isClient; // Usually only Clients create claims
  const canDelete = isAdmin;
  const canAssign = isAdmin || isSupervisor;
  const canEdit = isAdmin || isSupervisor || isOperator;

  useEffect(() => {
    if (token) fetchClaims()
  }, [token])

  const fetchClaims = async () => {
    try {
      setLoading(true)
      // The backend automatically filters based on Role. We just call GET.
      const response = await fetch("http://localhost:8080/api/claims?size=100", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setClaims(data.content || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this claim?")) return;
    try {
      await fetch(`http://localhost:8080/api/claims/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      setClaims(claims.filter((c) => c.id !== id))
    } catch (error) { console.error(error) }
  }

  const openAssignModal = (id: string) => {
    setSelectedClaimId(id);
    setShowAssignModal(true);
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Claims Management</h1>
              <p className="text-muted-foreground">
                Role: <span className="font-bold text-primary">{user?.role}</span>
              </p>
            </div>
            {/* Only Clients (or Admins if desired) can create new Claims */}
            {canCreate && (
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="w-4 h-4" /> New Claim
              </Button>
            )}
          </div>

          {/* Table Section */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} className="border-b border-border hover:bg-muted/30">
                    <td className="px-6 py-4">{claim.title}</td>
                    <td className="px-6 py-4">${claim.amount}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {claim.claimDate ? new Date(claim.claimDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      
                      {/* ASSIGN Button (Admin/Supervisor Only) */}
                      {canAssign && (
                        <Button variant="ghost" size="sm" onClick={() => openAssignModal(claim.id)} title="Assign to Operator">
                           <UserPlus className="w-4 h-4 text-blue-500" />
                        </Button>
                      )}

                      {/* EDIT Button (Admin/Staff) */}
                      {canEdit && (
                        <Button variant="ghost" size="sm" onClick={() => { setEditingClaim(claim); setShowCreateModal(true); }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}

                      {/* DELETE Button (Admin Only) */}
                      {canDelete && (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(claim.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Create/Edit Modal */}
      <ClaimModal 
        isOpen={showCreateModal} 
        onClose={() => { setShowCreateModal(false); setEditingClaim(null); fetchClaims(); }} 
        claim={editingClaim} 
      />

      {/* Assign Modal (New) */}
      <AssignModal
        isOpen={showAssignModal}
        onClose={() => { setShowAssignModal(false); fetchClaims(); }}
        claimId={selectedClaimId}
      />
    </div>
  )
}

// Helper for Status Colors
function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    SUBMITTED: "bg-yellow-100 text-yellow-800",
    IN_REVIEW: "bg-blue-100 text-blue-800",
    RESOLVED: "bg-green-100 text-green-800",
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100"}`}>
      {status}
    </span>
  )
}