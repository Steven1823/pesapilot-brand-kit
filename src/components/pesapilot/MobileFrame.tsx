import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
  showStatusBar?: boolean;
}

export const MobileFrame = ({ children, className, showStatusBar = true }: MobileFrameProps) => {
  return (
    <div className={cn("mobile-container min-h-screen bg-background flex flex-col", className)}>
      {showStatusBar && (
        <div className="h-11 flex items-center justify-between px-6 text-micro">
          <span className="font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-4 h-2 rounded-sm bg-foreground" />
              <div className="w-4 h-2 rounded-sm bg-foreground/60" />
              <div className="w-4 h-2 rounded-sm bg-foreground/30" />
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <div className="w-6 h-3 rounded-sm border border-foreground relative">
              <div className="absolute inset-0.5 right-1 bg-success rounded-sm" style={{ width: "80%" }} />
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-foreground rounded-r" />
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
