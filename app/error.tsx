"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md w-full glass-card p-10 rounded-3xl border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
          <AlertCircle size={40} />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We apologize for the inconvenience. Our systems encountered an unexpected error while processing your request.
        </p>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all hover:border-white/20"
        >
          <RotateCcw size={20} /> Try again
        </button>
      </div>
    </div>
  );
}
