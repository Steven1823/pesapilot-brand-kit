import { cn } from "@/lib/utils";

interface RiskMeterProps {
  level: "low" | "medium" | "high";
  score?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const RiskMeter = ({ level, score, showLabel = true, size = "md" }: RiskMeterProps) => {
  const colors = {
    low: "bg-success",
    medium: "bg-warning",
    high: "bg-destructive",
  };

  const labels = {
    low: "Safe",
    medium: "Caution",
    high: "High Risk",
  };

  const textColors = {
    low: "text-success",
    medium: "text-warning",
    high: "text-destructive",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const segments = level === "low" ? 1 : level === "medium" ? 2 : 3;

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={cn("text-caption font-semibold", textColors[level])}>
            {labels[level]}
          </span>
          {score !== undefined && (
            <span className="text-micro text-muted-foreground">
              Score: {score}/100
            </span>
          )}
        </div>
      )}
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              heights[size],
              i <= segments ? colors[level] : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
};
