import { ProductCondition } from "@/lib/types";

export default function ConditionBadge({ condition }: { condition: ProductCondition }) {
  const getBadgeStyle = () => {
    switch (condition) {
      case "good":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "fair":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "normal":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeStyle()}`}>
      {condition.charAt(0).toUpperCase() + condition.slice(1)} Condition
    </span>
  );
}
