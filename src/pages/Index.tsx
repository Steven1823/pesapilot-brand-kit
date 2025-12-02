import { useState } from "react";
import { OnboardingScreen } from "@/components/pesapilot/screens/OnboardingScreen";
import { HomeScreen } from "@/components/pesapilot/screens/HomeScreen";
import { WalletConnectScreen } from "@/components/pesapilot/screens/WalletConnectScreen";
import { TransactionDetailScreen } from "@/components/pesapilot/screens/TransactionDetailScreen";
import { ApprovalModal } from "@/components/pesapilot/screens/ApprovalModal";
import { ExplainOverlay } from "@/components/pesapilot/screens/ExplainOverlay";
import { SettingsScreen } from "@/components/pesapilot/screens/SettingsScreen";
import { RecoveryScreen } from "@/components/pesapilot/screens/RecoveryScreen";
import { SendScreen } from "@/components/pesapilot/screens/SendScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Screen = 
  | "showcase" 
  | "onboarding" 
  | "home" 
  | "wallet-connect" 
  | "transaction" 
  | "settings" 
  | "recovery" 
  | "send"
  | "approval"
  | "explain";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("showcase");
  const [showApproval, setShowApproval] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const screens = [
    { id: "onboarding" as const, label: "Onboarding", description: "Welcome & social login" },
    { id: "home" as const, label: "Home Feed", description: "Balance & activity" },
    { id: "wallet-connect" as const, label: "Wallet Connect", description: "Step-by-step flow" },
    { id: "transaction" as const, label: "Transaction Details", description: "With AI explanation" },
    { id: "send" as const, label: "Demo Send", description: "Scroll testnet" },
    { id: "settings" as const, label: "Settings", description: "Preferences" },
    { id: "recovery" as const, label: "Recovery", description: "MPC backup setup" },
    { id: "approval" as const, label: "Approval Modal", description: "Permission request" },
    { id: "explain" as const, label: "AI Explain", description: "Transaction overlay" },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case "onboarding":
        return <OnboardingScreen onContinue={() => setActiveScreen("wallet-connect")} />;
      case "home":
        return (
          <HomeScreen 
            onNavigate={(screen) => {
              if (screen === "send") setActiveScreen("send");
              if (screen === "transaction") setActiveScreen("transaction");
            }} 
          />
        );
      case "wallet-connect":
        return (
          <WalletConnectScreen 
            onBack={() => setActiveScreen("showcase")} 
            onConnect={() => setActiveScreen("home")} 
          />
        );
      case "transaction":
        return (
          <TransactionDetailScreen 
            onBack={() => setActiveScreen("home")} 
            onExplain={() => setShowExplain(true)} 
          />
        );
      case "settings":
        return <SettingsScreen onNavigate={(screen) => {
          if (screen === "recovery") setActiveScreen("recovery");
        }} />;
      case "recovery":
        return <RecoveryScreen onBack={() => setActiveScreen("settings")} />;
      case "send":
        return <SendScreen onBack={() => setActiveScreen("home")} />;
      case "approval":
        return (
          <div className="mobile-container min-h-screen bg-background flex items-center justify-center">
            <ApprovalModal 
              onClose={() => setActiveScreen("showcase")} 
              onApprove={() => setActiveScreen("showcase")}
              onReject={() => setActiveScreen("showcase")}
            />
          </div>
        );
      case "explain":
        return (
          <div className="mobile-container min-h-screen bg-background flex items-center justify-center">
            <ExplainOverlay 
              onClose={() => setActiveScreen("showcase")} 
              onProceed={() => setActiveScreen("showcase")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (activeScreen !== "showcase") {
    return (
      <div className="min-h-screen bg-background relative">
        {/* Back Button */}
        <button
          onClick={() => setActiveScreen("showcase")}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-card/80 backdrop-blur-xl rounded-lg border border-border text-caption font-medium hover:bg-card transition-colors"
        >
          ← Back to Showcase
        </button>
        
        {/* Screen Container */}
        <div className="flex justify-center">
          {renderScreen()}
        </div>

        {/* Overlay Modals */}
        {showApproval && (
          <ApprovalModal 
            onClose={() => setShowApproval(false)} 
            onApprove={() => setShowApproval(false)}
            onReject={() => setShowApproval(false)}
          />
        )}
        {showExplain && (
          <ExplainOverlay 
            onClose={() => setShowExplain(false)} 
            onProceed={() => setShowExplain(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="py-16 px-6 text-center border-b border-border">
        <Badge variant="info" className="mb-4">Hackathon MVP</Badge>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient-primary">
          PesaPilot
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
          Mobile-first Crypto Copilot UI Kit
        </p>
        <p className="text-caption text-muted-foreground max-w-md mx-auto">
          Beautiful, trust-forward design system for crypto wallet applications. 
          Navigate transactions safely with AI-powered explanations.
        </p>
      </header>

      {/* Color Palette */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Primary", color: "bg-primary", hex: "#00BFA6" },
              { name: "Accent", color: "bg-accent", hex: "#FFC857" },
              { name: "Background", color: "bg-background border border-border", hex: "#0B1221" },
              { name: "Surface", color: "bg-card", hex: "#0F1724" },
              { name: "Success", color: "bg-success", hex: "#22C55E" },
              { name: "Warning", color: "bg-warning", hex: "#F59E0B" },
              { name: "Danger", color: "bg-destructive", hex: "#EF4444" },
              { name: "Muted", color: "bg-muted", hex: "#1E293B" },
            ].map((c) => (
              <div key={c.name} className="text-center">
                <div className={cn("w-full h-16 rounded-xl mb-2", c.color)} />
                <p className="font-semibold text-caption">{c.name}</p>
                <p className="text-micro text-muted-foreground font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-6">Typography</h2>
          <div className="space-y-4">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-display">Display</span>
              <span className="text-micro text-muted-foreground">Space Grotesk / 30px / Bold</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-heading">Heading</span>
              <span className="text-micro text-muted-foreground">Space Grotesk / 20px / Semibold</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-subheading">Subheading</span>
              <span className="text-micro text-muted-foreground">Inter / 18px / Medium</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-body">Body Text</span>
              <span className="text-micro text-muted-foreground">Inter / 16px / Regular</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-caption">Caption</span>
              <span className="text-micro text-muted-foreground">Inter / 14px / Regular</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-micro">Micro</span>
              <span className="text-micro text-muted-foreground">Inter / 12px / Regular</span>
            </div>
          </div>
        </div>
      </section>

      {/* Component Library */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-6">Components</h2>
          
          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-subheading mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="glow">Glow</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="outline-primary">Outline Primary</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-subheading mb-4">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="risk-low">Low Risk</Badge>
              <Badge variant="risk-medium">Medium Risk</Badge>
              <Badge variant="risk-high">High Risk</Badge>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-subheading mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default" className="p-4">
                <p className="font-semibold">Default Card</p>
                <p className="text-caption text-muted-foreground">Standard surface</p>
              </Card>
              <Card variant="glass" className="p-4">
                <p className="font-semibold">Glass Card</p>
                <p className="text-caption text-muted-foreground">Blurred background</p>
              </Card>
              <Card variant="safe" className="p-4">
                <p className="font-semibold">Safe Card</p>
                <p className="text-caption text-muted-foreground">Success indicator</p>
              </Card>
              <Card variant="danger" className="p-4">
                <p className="font-semibold">Danger Card</p>
                <p className="text-caption text-muted-foreground">Warning indicator</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Screens Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-2">UI Screens</h2>
          <p className="text-caption text-muted-foreground mb-6">
            Click any screen to view the full mobile mockup
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {screens.map((screen) => (
              <Card
                key={screen.id}
                variant="interactive"
                className="p-4 cursor-pointer"
                onClick={() => setActiveScreen(screen.id)}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold mb-1">{screen.label}</h3>
                <p className="text-caption text-muted-foreground">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-caption text-muted-foreground">
          PesaPilot — Lovable UI Kit (Hackathon MVP)
        </p>
        <p className="text-micro text-muted-foreground mt-2">
          Mobile-first • Crypto-forward • Trust-first design
        </p>
      </footer>
    </div>
  );
};

export default Index;
