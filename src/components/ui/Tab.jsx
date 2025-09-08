import AnimatedCounter from "@/components/AnimatedCounter";
import { cn } from "@/lib/utils";

export default function Tab({ name, icon, count, type, onClick, className }) {
  const searchFoundClass = "bg-gray-300/30 px-1 text-gray-500 rounded-md";

  return (
    <button className={className} onClick={onClick}>
      <div className="flex items-center gap-2">
        {icon}
        <p>{name}</p>
        <p className={cn(searchFoundClass)}>
          <AnimatedCounter count={count} />
        </p>
      </div>
    </button>
  );
}
