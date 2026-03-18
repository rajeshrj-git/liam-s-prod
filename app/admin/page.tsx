"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Login successful");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="w-full max-w-md relative z-10 glass-card p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(255,107,0,0.1)]">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-accent/20 border border-accent/50 rounded-full flex items-center justify-center text-accent shadow-[0_0_20px_rgba(255,107,0,0.3)]">
            <Lock size={30} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mb-2">Admin Portal</h1>
        <p className="text-center text-gray-400 mb-8">Sign in to manage your inventory</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 px-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@jarviscomputer.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 px-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-black font-bold py-3.5 rounded-xl transition-all hover:-translate-y-1 mt-4 disabled:opacity-50 disabled:hover:translate-y-0 shadow-[0_10px_20px_rgba(255,107,0,0.2)]"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
