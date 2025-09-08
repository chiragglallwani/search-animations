import Switch from "@/components/ui/Switch";
import { cn } from "@/lib/utils";

export default function SettingsDialog({ icon, label, value, onChange }) {
  return (
    <div className="flex items-center gap-2 justify-between w-40">
      <div className="flex items-center gap-2">
        {icon}
        <p className={cn("text-gray-500 text-lg", value && "text-black")}>
          {label}
        </p>
      </div>
      <Switch id={label} value={value} onChange={onChange} />
    </div>
  );
}
