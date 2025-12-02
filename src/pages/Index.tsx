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
import { ReceiveScreen } from "@/components/pesapilot/screens/ReceiveScreen";
import { LearnScreen } from "@/components/pesapilot/screens/LearnScreen";
import { SafetyScreen } from "@/components/pesapilot/screens/SafetyScreen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PilotIcon } from "@/components/icons/PesaPilotIcons";
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
  | "receive"
  | "learn"
  | "safety"
  | "approval"
  | "explain";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("showcase");
  const [showApproval, setShowApproval] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const screens = [
    { id: "onboarding" as const, label: "Onboarding", description: "Signup/Login flow", emoji: "👋" },
    { id: "home" as const, label: "Wallet Dashboard", description: "Balance & AI tips", emoji: "💰" },
    { id: "send" as const, label: "Send Crypto", description: "AI-assisted sending", emoji: "📤" },
    { id: "receive" as const, label: "Receive Crypto", description: "QR code & copy", emoji: "📥" },
    { id: "safety" as const, label: "Safety Assistant", description: "Scam & gas alerts", emoji: "🛡️" },
    { id: "learn" as const, label: "Learn & Earn", description: "Tutorials & rewards", emoji: "📚" },
    { id: "wallet-connect" as const, label: "Wallet Connect", description: "Step-by-step flow", emoji: "🔗" },
    { id: "transaction" as const, label: "Transaction Details", description: "With AI explanation", emoji: "📋" },
    { id: "settings" as const, label: "Settings", description: "Preferences", emoji: "⚙️" },
    { id: "recovery" as const, label: "Recovery", description: "MPC backup setup", emoji: "🔑" },
    { id: "approval" as const, label: "Approval Modal", description: "Permission request", emoji: "✅" },
    { id: "explain" as const, label: "AI Explain", description: "Transaction overlay", emoji: "🤖" },
  ];

  const handleNavigate = (screen: string) => {
    if (screen === "send") setActiveScreen("send");
    else if (screen === "receive") setActiveScreen("receive");
    else if (screen === "safety") setActiveScreen("safety");
    else if (screen === "explore") setActiveScreen("learn");
    else if (screen === "home") setActiveScreen("home");
    else if (screen === "transaction") setActiveScreen("transaction");
    else if (screen === "recovery") setActiveScreen("recovery");
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "onboarding":
        return <OnboardingScreen onContinue={() => setActiveScreen("wallet-connect")} />;
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
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
        return <SettingsScreen onNavigate={handleNavigate} />;
      case "recovery":
        return <RecoveryScreen onBack={() => setActiveScreen("settings")} />;
      case "send":
        return <SendScreen onBack={() => setActiveScreen("home")} />;
      case "receive":
        return <ReceiveScreen onBack={() => setActiveScreen("home")} />;
      case "learn":
        return <LearnScreen onNavigate={handleNavigate} />;
      case "safety":
        return <SafetyScreen onNavigate={handleNavigate} />;
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
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-card/80 backdrop-blur-xl rounded-lg border border-border/50 text-caption font-medium hover:bg-card transition-all tap-scale hover-glow"
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
    <div className="min-h-screen bg-background animated-gradient mesh-overlay">
      {/* Hero Section */}
      <header className="py-16 px-6 text-center border-b border-border/50 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary animate-float">
            <PilotIcon size={32} className="text-primary-foreground" />
          </div>
        </div>
        <Badge variant="info" className="mb-4">Crypto-Tech Mobile App</Badge>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient-primary">
          PesaPilot
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
          AI Co-pilot for Crypto • Simple as M-Pesa
        </p>
        <p className="text-caption text-muted-foreground max-w-md mx-auto">
          Mobile-first crypto wallet with AI-powered safety, scam detection, and plain-language explanations.
        </p>
      </header>

      {/* Color Palette */}
      <section className="py-12 px-6 border-b border-border/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-6">🎨 Color Palette</h2>
          <p className="text-caption text-muted-foreground mb-4">Neon blue/purple crypto-tech aesthetic with subtle gradients</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Neon Blue", color: "bg-primary", hex: "#3366FF" },
              { name: "Electric Purple", color: "bg-secondary", hex: "#7C3AED" },
              { name: "Neon Purple", color: "bg-accent", hex: "#B366FF" },
              { name: "Cyan", color: "bg-neon-cyan", hex: "#00D9FF" },
              { name: "Success", color: "bg-success", hex: "#12D9A0" },
              { name: "Warning", color: "bg-warning", hex: "#FF9F1C" },
              { name: "Background", color: "bg-card border border-border", hex: "#0A0A10" },
              { name: "Surface", color: "bg-muted", hex: "#111118" },
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

      {/* Components */}
      <section className="py-12 px-6 border-b border-border/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-6">🧩 Components</h2>
          
          {/* Buttons */}
          <div className="mb-8">
            <h3 className="text-subheading mb-4">Buttons</h3>
            <p className="text-caption text-muted-foreground mb-3">All buttons have tap animations and loading states</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="glow">Glow Effect</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Danger</Button>
              <Button variant="outline">Outline</Button>
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
              <Card variant="glass" className="p-4 neon-border">
                <p className="font-semibold">Glass + Neon Border</p>
                <p className="text-caption text-muted-foreground">Glowing border effect</p>
              </Card>
              <Card variant="interactive" className="p-4">
                <p className="font-semibold">Interactive Card</p>
                <p className="text-caption text-muted-foreground">Hover/tap animations</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Screens Grid */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-2">📱 App Screens</h2>
          <p className="text-caption text-muted-foreground mb-6">
            Click any screen to view the full mobile mockup with micro-interactions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {screens.map((screen, index) => (
              <Card
                key={screen.id}
                variant="interactive"
                className="p-4 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setActiveScreen(screen.id)}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">{screen.emoji}</span>
                </div>
                <h3 className="font-semibold mb-1 text-body">{screen.label}</h3>
                <p className="text-caption text-muted-foreground">{screen.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Notes */}
      <section className="py-12 px-6 border-t border-border/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading font-display mb-4">📝 Developer Notes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="glass" className="p-5">
              <h3 className="font-semibold mb-2">🎯 Component Structure</h3>
              <ul className="text-caption text-muted-foreground space-y-1">
                <li>• All screens in <code className="text-primary">src/components/pesapilot/screens/</code></li>
                <li>• Icons in <code className="text-primary">src/components/icons/</code></li>
                <li>• Design tokens in <code className="text-primary">src/index.css</code></li>
                <li>• Tailwind config in <code className="text-primary">tailwind.config.ts</code></li>
              </ul>
            </Card>
            <Card variant="glass" className="p-5">
              <h3 className="font-semibold mb-2">✨ Micro-interactions</h3>
              <ul className="text-caption text-muted-foreground space-y-1">
                <li>• <code className="text-primary">.tap-scale</code> - Button press effect</li>
                <li>• <code className="text-primary">.hover-glow</code> - Neon glow on hover</li>
                <li>• <code className="text-primary">.glow-primary</code> - Static glow effect</li>
                <li>• <code className="text-primary">.animate-float</code> - Floating animation</li>
                <li>• <code className="text-primary">.neon-border</code> - Glowing border</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center relative z-10">
        <p className="text-caption text-muted-foreground">
          PesaPilot — Mobile-first Crypto Copilot App
        </p>
        <p className="text-micro text-muted-foreground mt-2">
          Neon Blue/Purple • AI-Powered • Scam Detection • M-Pesa Simple
        </p>
      </footer>
    </div>
  );
};

export default Index;