import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { BottomNav } from "@/components/pesapilot/BottomNav";
import {
  ShieldIcon,
  KeyIcon,
  LanguageIcon,
  ProfileIcon,
  ArrowRightIcon,
  InfoIcon,
  SettingsIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface SettingsScreenProps {
  onNavigate?: (screen: string) => void;
}

export const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const menuItems = [
    {
      section: "Account",
      items: [
        { icon: ProfileIcon, label: "Profile", subtitle: "pilot@email.com", action: "profile" },
        { icon: ShieldIcon, label: "Security", subtitle: "2FA enabled", badge: "Secure", badgeVariant: "success" as const, action: "security" },
        { icon: KeyIcon, label: "Recovery", subtitle: "Set up backup", badge: "Action needed", badgeVariant: "warning" as const, action: "recovery" },
      ],
    },
    {
      section: "Preferences",
      items: [
        { icon: LanguageIcon, label: "Language", subtitle: "English", action: "language" },
        { icon: SettingsIcon, label: "Network", subtitle: "Scroll Testnet", action: "network" },
        { icon: InfoIcon, label: "About", subtitle: "Version 1.0.0", action: "about" },
      ],
    },
  ];

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-5 py-4">
          <h1 className="text-heading font-display">Settings</h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-5 pb-4 space-y-6">
          {menuItems.map((section) => (
            <div key={section.section}>
              <h3 className="text-caption text-muted-foreground uppercase tracking-wide mb-3">
                {section.section}
              </h3>
              <Card variant="default" className="p-0 overflow-hidden divide-y divide-border">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => onNavigate?.(item.action)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon size={20} className="text-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.label}</span>
                          {item.badge && (
                            <Badge variant={item.badgeVariant} className="text-micro">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="text-caption text-muted-foreground">{item.subtitle}</span>
                      </div>
                      <ArrowRightIcon size={18} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </Card>
            </div>
          ))}

          {/* MPC Recovery Info Card */}
          <Card variant="gradient" className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <KeyIcon size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Social Recovery</h4>
                <p className="text-caption text-muted-foreground mb-3">
                  Your wallet uses advanced MPC technology. No seed phrases needed — recover with trusted contacts.
                </p>
                <Button variant="outline-primary" size="sm" onClick={() => onNavigate?.("recovery")}>
                  Set Up Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <div>
            <h3 className="text-caption text-destructive uppercase tracking-wide mb-3">
              Danger Zone
            </h3>
            <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
              Disconnect Wallet
            </Button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab="home" onTabChange={(tab) => onNavigate?.(tab)} />
      </div>
    </MobileFrame>
  );
};
