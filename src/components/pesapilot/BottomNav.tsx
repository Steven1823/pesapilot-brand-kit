import { cn } from "@/lib/utils";
import { WalletIcon, HistoryIcon, SettingsIcon, PilotIcon } from "@/components/icons/PesaPilotIcons";

interface BottomNavProps {
  activeTab?: "home" | "history" | "explore" | "settings";
  onTabChange?: (tab: "home" | "history" | "explore" | "settings") => void;
}

export const BottomNav = ({ activeTab = "home", onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home" as const, icon: WalletIcon, label: "Home" },
    { id: "history" as const, icon: HistoryIcon, label: "Activity" },
    { id: "explore" as const, icon: PilotIcon, label: "Explore" },
    { id: "settings" as const, icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <nav className="h-20 bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-around px-4 pb-safe-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl transition-all duration-200",
              isActive && "bg-primary/10"
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
