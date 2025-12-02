import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { BottomNav } from "@/components/pesapilot/BottomNav";
import { SafetyScore } from "@/components/pesapilot/SafetyScore";
import { TransactionCard } from "@/components/pesapilot/TransactionCard";
import { QuickAction } from "@/components/pesapilot/QuickAction";
import {
  SendIcon,
  ReceiveIcon,
  SwapIcon,
  ScanIcon,
  PilotIcon,
} from "@/components/icons/PesaPilotIcons";

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [activeTab, setActiveTab] = useState<"home" | "history" | "explore" | "settings">("home");

  const balance = "2,450.00";
  const currency = "USD";

  const recentTransactions = [
    {
      type: "receive" as const,
      amount: "0.5",
      token: "ETH",
      address: "0x1234...5678",
      timestamp: "Today, 2:30 PM",
      status: "confirmed" as const,
    },
    {
      type: "send" as const,
      amount: "100",
      token: "USDC",
      address: "0xabcd...efgh",
      timestamp: "Yesterday, 10:15 AM",
      status: "confirmed" as const,
    },
  ];

  return (
    <MobileFrame showStatusBar={true}>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <PilotIcon size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-micro text-muted-foreground">Welcome back</p>
              <p className="font-semibold">Pilot</p>
            </div>
          </div>
          <Button variant="glass" size="icon-sm">
            <ScanIcon size={20} />
          </Button>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-5 pb-4 space-y-6">
          {/* Balance Card */}
          <Card variant="glass" className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-caption text-muted-foreground mb-1">Total Balance</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-display font-bold">${balance}</span>
                <span className="text-muted-foreground">{currency}</span>
              </div>
              <div className="flex items-center gap-2 text-success text-caption">
                <span>↑ 12.5%</span>
                <span className="text-muted-foreground">past 24h</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3">
            <QuickAction
              icon={<SendIcon size={22} className="text-primary" />}
              label="Send"
              variant="primary"
              onClick={() => onNavigate?.("send")}
            />
            <QuickAction
              icon={<ReceiveIcon size={22} className="text-success" />}
              label="Receive"
              variant="default"
            />
            <QuickAction
              icon={<SwapIcon size={22} className="text-accent" />}
              label="Swap"
              variant="accent"
            />
            <QuickAction
              icon={<ScanIcon size={22} className="text-foreground" />}
              label="Scan"
              variant="default"
            />
          </div>

          {/* Safety Score */}
          <Card variant="default" className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold mb-1">Safety Score</h3>
                <p className="text-caption text-muted-foreground">
                  Your wallet is secure
                </p>
              </div>
              <SafetyScore score={85} size="sm" />
            </div>
          </Card>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Recent Activity</h3>
              <Button variant="link" className="text-primary text-caption p-0 h-auto">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((tx, i) => (
                <TransactionCard
                  key={i}
                  {...tx}
                  onClick={() => onNavigate?.("transaction")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </MobileFrame>
  );
};
