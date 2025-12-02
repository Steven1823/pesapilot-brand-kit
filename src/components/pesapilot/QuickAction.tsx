import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface QuickActionProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent";
}

export const QuickAction = ({ icon, label, onClick, variant = "default" }: QuickActionProps) => {
  const variants = {
    default: "bg-secondary hover:bg-secondary/80 text-foreground",
    primary: "bg-primary/20 hover:bg-primary/30 text-primary",
    accent: "bg-accent/20 hover:bg-accent/30 text-accent",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 active:scale-95",
        variants[variant]
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-caption font-medium">{label}</span>
    </button>
  );
};
