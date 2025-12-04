"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { ProductModal } from "@/components/product-modal"

import { useAuth } from "@/app/contexts/auth-context"

interface Product {
  id: string
  name: string
  basePrice: number 
  description: string
  type: string      
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)


  const { token } = useAuth()

  useEffect(() => {
    // Only fetch if we have a token
    if (token) {
      fetchProducts()
    }
  }, [token])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:8080/api/products", {
        // ✅ 3. Add Authorization Header
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setProducts(data.content || []) 
      } else {
        console.error("Failed to fetch products (403/401)")
      }
      
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:8080/api/products/${id}`, {
          method: "DELETE",
          // ✅ 4. Add Authorization Header here too!
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    fetchProducts()
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
                <p className="text-muted-foreground">Manage your product inventory</p>
              </div>
              <Button onClick={() => setShowModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Product
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button onClick={() => setShowModal(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Product
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th> 
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {product.basePrice !== null ? `$${product.basePrice}` : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                           <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                             {product.type || "N/A"}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground truncate max-w-[200px]">
                          {product.description || "No description"}
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="gap-1">
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
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
      <ProductModal isOpen={showModal} onClose={handleCloseModal} product={editingProduct} />
    </div>
  )
}