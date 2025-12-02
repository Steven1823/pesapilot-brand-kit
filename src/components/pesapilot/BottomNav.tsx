import { cn } from "@/lib/utils";
import { WalletIcon, SendIcon, ReceiveIcon, ShieldIcon, PilotIcon } from "@/components/icons/PesaPilotIcons";

interface BottomNavProps {
  activeTab?: "home" | "send" | "receive" | "safety" | "explore";
  onTabChange?: (tab: "home" | "send" | "receive" | "safety" | "explore") => void;
}

export const BottomNav = ({ activeTab = "home", onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home" as const, icon: WalletIcon, label: "Home" },
    { id: "send" as const, icon: SendIcon, label: "Send" },
    { id: "receive" as const, icon: ReceiveIcon, label: "Receive" },
    { id: "safety" as const, icon: ShieldIcon, label: "Safety" },
    { id: "explore" as const, icon: PilotIcon, label: "Learn" },
  ];

  return (
    <nav className="h-20 bg-card/80 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-2 pb-safe-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 tap-scale",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl transition-all duration-200",
              isActive && "bg-primary/15 glow-primary"
            )}>
              <Icon size={22} />
            </div>
            <span className="text-micro font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
