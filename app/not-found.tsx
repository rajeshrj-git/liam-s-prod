"use client";

import Link from "next/link";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Ghost size={120} className="text-accent drop-shadow-[0_0_15px_rgba(255,107,0,0.5)] animate-bounce" strokeWidth={1} />
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 tracking-tighter">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
          
          <p className="text-gray-400 mb-10 text-lg">
            The page you're looking for seems to have vanished into the digital void. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,107,0,0.3)]"
            >
              <Home size={20} /> Return Home
            </Link>
            
            <button 
              onClick={() => {
                if (typeof window !== "undefined") window.history.back();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-all"
            >
              <ArrowLeft size={20} /> Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
