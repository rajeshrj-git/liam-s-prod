export default function SkeletonLoader() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full bg-card/80 animate-pulse">
      <div className="aspect-[4/3] bg-white/5 w-full"></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="h-4 bg-white/5 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-white/10 rounded w-full mb-2"></div>
        <div className="h-6 bg-white/10 rounded w-2/3 mb-6"></div>
        
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/5">
          <div className="space-y-2 w-1/2">
            <div className="h-6 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5"></div>
        </div>
      </div>
    </div>
  );
}
