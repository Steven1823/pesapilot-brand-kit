import { useState } from "react";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { BottomNav } from "@/components/pesapilot/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafetyScore } from "@/components/pesapilot/SafetyScore";
import { ShieldIcon, WarningIcon, InfoIcon, CheckIcon } from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface SafetyScreenProps {
  onNavigate?: (screen: string) => void;
}

interface Alert {
  id: string;
  type: "scam" | "risky" | "gas" | "info";
  title: string;
  description: string;
  timestamp: string;
  dismissed: boolean;
}

export const SafetyScreen = ({ onNavigate }: SafetyScreenProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "scam",
      title: "Phishing Site Blocked",
      description: "PesaPilot blocked a connection request from a known phishing site mimicking Uniswap.",
      timestamp: "2 min ago",
      dismissed: false,
    },
    {
      id: "2",
      type: "risky",
      title: "Risky Token Detected",
      description: "Token 'MOONX' has 95% holder concentration and unlocked liquidity. Proceed with caution.",
      timestamp: "1 hour ago",
      dismissed: false,
    },
    {
      id: "3",
      type: "gas",
      title: "High Gas Alert",
      description: "Network fees are 3x higher than usual. Consider waiting for lower fees.",
      timestamp: "3 hours ago",
      dismissed: false,
    },
    {
      id: "4",
      type: "info",
      title: "Security Tip",
      description: "Never share your seed phrase. PesaPilot will never ask for it.",
      timestamp: "1 day ago",
      dismissed: true,
    },
  ]);

  const getAlertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "scam":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          icon: <WarningIcon size={24} className="text-destructive" />,
          badge: "danger" as const,
        };
      case "risky":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          icon: <WarningIcon size={24} className="text-warning" />,
          badge: "warning" as const,
        };
      case "gas":
        return {
          bg: "bg-secondary/10",
          border: "border-secondary/30",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
              <path d="M3 22V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l3-3" />
              <path d="M14 22v-4a2 2 0 0 1 2-2h4" />
            </svg>
          ),
          badge: "info" as const,
        };
      case "info":
        return {
          bg: "bg-primary/10",
          border: "border-primary/30",
          icon: <InfoIcon size={24} className="text-primary" />,
          badge: "info" as const,
        };
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, dismissed: true } : a
    ));
  };

  const activeAlerts = alerts.filter(a => !a.dismissed);
  const dismissedAlerts = alerts.filter(a => a.dismissed);

  return (
    <MobileFrame className="animated-gradient">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="screen-padding pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary">
              <ShieldIcon size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-heading font-display">Safety Assistant</h1>
              <p className="text-caption text-muted-foreground">AI-powered protection</p>
            </div>
          </div>
        </div>

        {/* Safety Score Card */}
        <div className="px-5 mb-6">
          <Card variant="glass" className="p-5 rounded-2xl neon-border animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-micro text-muted-foreground uppercase tracking-wide mb-1">
                  Wallet Security
                </p>
                <SafetyScore score={85} size="lg" />
              </div>
              <div className="text-right">
                <p className="text-4xl font-display font-bold text-gradient-cyber">85</p>
                <p className="text-caption text-muted-foreground">out of 100</p>
              </div>
            </div>
            
            {/* Security Checklist */}
            <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
              {[
                { label: "2FA Enabled", done: true },
                { label: "Recovery Set", done: true },
                { label: "Whitelist Active", done: false },
                { label: "Daily Limit", done: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    item.done ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    {item.done ? <CheckIcon size={12} /> : <span className="text-micro">○</span>}
                  </div>
                  <span className={cn(
                    "text-caption",
                    item.done ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Alerts */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {activeAlerts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-subheading font-semibold">Active Alerts</h2>
                <Badge variant="danger">{activeAlerts.length}</Badge>
              </div>
              
              <div className="space-y-3">
                {activeAlerts.map((alert, index) => {
                  const style = getAlertStyle(alert.type);
                  return (
                    <Card 
                      key={alert.id}
                      className={cn(
                        "p-4 rounded-2xl border animate-fade-in",
                        style.bg,
                        style.border
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {style.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-body">{alert.title}</h3>
                            <Badge variant={style.badge} className="flex-shrink-0">
                              {alert.type === "scam" ? "Blocked" : alert.type === "gas" ? "Alert" : "Warning"}
                            </Badge>
                          </div>
                          <p className="text-caption text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-micro text-muted-foreground">{alert.timestamp}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-micro h-7 px-2"
                              onClick={() => dismissAlert(alert.id)}
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {/* AI Tip */}
          <Card variant="glass" className="p-4 rounded-2xl mt-6 neon-border-purple">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <p className="font-semibold text-body mb-1">AI Safety Tip</p>
                <p className="text-caption text-muted-foreground">
                  Always double-check wallet addresses before sending. Scammers often create addresses 
                  that look similar to legitimate ones.
                </p>
              </div>
            </div>
          </Card>

          {/* Dismissed Section */}
          {dismissedAlerts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-caption text-muted-foreground mb-3">Previously Dismissed</h3>
              <div className="space-y-2">
                {dismissedAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="flex items-center gap-2 text-caption text-muted-foreground opacity-60"
                  >
                    <CheckIcon size={14} />
                    <span>{alert.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab="home" onTabChange={(tab) => onNavigate?.(tab)} />
      </div>
    </MobileFrame>
  );
};