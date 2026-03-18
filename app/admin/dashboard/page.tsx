"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { Plus, LayoutDashboard, LogOut, Edit2, Trash2, Search, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  
  const supabase = createClient();
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    // Todo: Optimally delete images from storage too
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product deleted successfully");
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  if (isFormOpen) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h1>
            <button
              onClick={() => {
                setIsFormOpen(false);
                setEditingProduct(undefined);
              }}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/10 transition-colors"
            >
              <X size={18} /> Cancel
            </button>
          </div>
          <AdminProductForm 
            initialData={editingProduct} 
            onSuccess={() => {
              setIsFormOpen(false);
              setEditingProduct(undefined);
              fetchProducts();
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-card border-r border-white/5 p-6 flex flex-col gap-6 md:min-h-[calc(100vh-80px)] shrink-0 hidden md:flex">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <LayoutDashboard size={20} className="text-accent"/> Dashboard
        </h2>
        
        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 bg-accent/10 border border-accent/20 text-accent font-medium px-4 py-3 rounded-xl transition-colors">
            Inventory
          </button>
          <button 
            onClick={() => { setEditingProduct(undefined); setIsFormOpen(true); }}
            className="w-full flex items-center gap-3 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium px-4 py-3 rounded-xl transition-colors"
          >
            Add Product
          </button>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-400 font-medium px-4 py-3 rounded-xl transition-colors bg-red-500/10"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400">Total Products: {products.length}</p>
          </div>
          
          <button 
            onClick={() => { setEditingProduct(undefined); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-accent text-black font-bold px-5 py-2.5 rounded-xl hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(255,107,0,0.2)] md:hidden"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-card border border-white/10 p-4 rounded-xl">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-accent"
            />
          </div>
          
          <button 
            onClick={() => { setEditingProduct(undefined); setIsFormOpen(true); }}
            className="hidden md:flex items-center gap-2 bg-accent text-black font-bold px-5 py-2 rounded-xl hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(255,107,0,0.2)]"
          >
            <Plus size={20} /> Add New
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-white/10 rounded-2xl overflow-x-auto shadow-2xl">
          <table className="w-full min-w-[800px] text-left text-sm text-gray-300">
            <thead className="bg-[#1a1a1a] uppercase text-xs text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-black border border-white/10 overflow-hidden relative shrink-0">
                          {product.images && product.images[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white line-clamp-1">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.brand} • {product.condition}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-white">₹{product.price.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded w-fit ${product.is_available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.is_available ? 'In Stock' : 'Out of Stock'}
                        </span>
                        {product.is_featured && (
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded w-fit bg-accent/20 text-accent">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsFormOpen(true); }}
                          className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
