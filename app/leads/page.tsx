"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ArrowRightCircle } from "lucide-react" 
import { LeadModal } from "@/components/lead-modal"
import { useAuth } from "@/app/contexts/auth-context" 

interface Lead {
  id: string
  name: string
  contactInfo: string
  source: string
  status: string
  notes?: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      fetchLeads()
    }
  }, [token])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:8080/api/leads", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setLeads(data.content || []) 
      } else {
        console.error("Failed to fetch leads")
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await fetch(`http://localhost:8080/api/leads/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setLeads(leads.filter((l) => l.id !== id))
      } catch (error) {
        console.error("Error deleting lead:", error)
      }
    }
  }

  // ✅ THIS CONNECTS TO YOUR NEW BACKEND CONVERSION LOGIC
  const handleConvert = async (id: string) => {
    if(confirm("Convert this lead to a Client? \nThis will create a user account for them.")) {
        try {
            const response = await fetch(`http://localhost:8080/api/clients/convert/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                alert("Lead converted successfully! Credentials created.")
                fetchLeads() // Refresh list to see status change
            } else {
                const msg = await response.text()
                alert("Conversion failed: " + msg)
            }
        } catch (error) {
            console.error("Error converting lead", error)
        }
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingLead(null)
    fetchLeads()
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Leads</h1>
                <p className="text-muted-foreground">Track and manage your sales leads</p>
              </div>
              <Button onClick={() => setShowModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">No leads found</p>
                <Button onClick={() => setShowModal(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add First Lead
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact Info</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Source</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{lead.name}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{lead.contactInfo}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{lead.source}</td>
                        <td className="px-6 py-4 text-sm">
                          {/* Display Status Badge */}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              lead.status === 'CONVERTED' ? 'bg-green-100 text-green-700 border-green-200' : 
                              lead.status === 'NEW' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          {/* ✅ Convert Button: Only show if not already converted */}
                          {lead.status !== "CONVERTED" && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleConvert(lead.id)} 
                                title="Convert to Client"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                                <ArrowRightCircle className="w-5 h-5" />
                            </Button>
                          )}
                          
                          <Button variant="outline" size="sm" onClick={() => handleEdit(lead)} className="gap-1">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(lead.id)}
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

      <LeadModal isOpen={showModal} onClose={handleCloseModal} lead={editingLead} />
    </div>
  )
}