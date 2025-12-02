import { cn } from "@/lib/utils";
import { ShieldIcon } from "@/components/icons/PesaPilotIcons";

interface SafetyScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export const SafetyScore = ({ score, size = "md" }: SafetyScoreProps) => {
  const getColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Good";
    return "At Risk";
  };

  const sizes = {
    sm: { container: "w-16 h-16", icon: 20, text: "text-lg", label: "text-micro" },
    md: { container: "w-24 h-24", icon: 28, text: "text-2xl", label: "text-caption" },
    lg: { container: "w-32 h-32", icon: 36, text: "text-3xl", label: "text-body" },
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative flex items-center justify-center", sizes[size].container)}>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000 ease-out", getColor())}
          />
        </svg>
        <div className="flex flex-col items-center">
          <ShieldIcon size={sizes[size].icon} className={getColor()} />
          <span className={cn("font-bold font-display", sizes[size].text, getColor())}>
            {score}
          </span>
        </div>
      </div>
      <span className={cn("font-medium", sizes[size].label, getColor())}>
        {getLabel()}
      </span>
    </div>
  );
};
