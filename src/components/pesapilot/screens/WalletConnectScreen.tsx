import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import {
  WalletIcon,
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface WalletConnectScreenProps {
  onBack?: () => void;
  onConnect?: () => void;
}

export const WalletConnectScreen = ({ onBack, onConnect }: WalletConnectScreenProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [connecting, setConnecting] = useState(false);

  const walletOptions = [
    { id: "metamask", name: "MetaMask", icon: "🦊", popular: true },
    { id: "rainbow", name: "Rainbow", icon: "🌈", popular: true },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", popular: false },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗", popular: false },
  ];

  const handleConnect = async () => {
    setConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep(2);
    setConnecting(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(3);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col screen-padding">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon-sm" onClick={onBack}>
            <CloseIcon size={20} />
          </Button>
          <span className="font-display font-semibold">Connect Wallet</span>
          <div className="w-10" />
        </header>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex items-center",
                s < 3 && "flex-1"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-caption font-semibold transition-all duration-300",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <CheckIcon size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <WalletIcon size={40} className="text-primary" />
                </div>
                <h2 className="text-heading mb-2">Choose Your Wallet</h2>
                <p className="text-caption text-muted-foreground">
                  Connect your existing wallet securely
                </p>
              </div>

              <div className="space-y-3">
                {walletOptions.map((wallet) => (
                  <Card
                    key={wallet.id}
                    variant="interactive"
                    className="p-4"
                    onClick={handleConnect}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{wallet.icon}</span>
                        <div>
                          <span className="font-semibold">{wallet.name}</span>
                          {wallet.popular && (
                            <span className="ml-2 text-micro text-primary">Popular</span>
                          )}
                        </div>
                      </div>
                      <ArrowRightIcon size={20} className="text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-micro">
                  <span className="bg-background px-3 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" size="lg" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Social Login (No wallet needed)
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-heading mb-2">Connecting...</h2>
              <p className="text-caption text-muted-foreground max-w-xs">
                Please confirm the connection in your wallet app
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <CheckIcon size={48} className="text-success" />
              </div>
              <h2 className="text-heading mb-2">Connected!</h2>
              <p className="text-caption text-muted-foreground max-w-xs mb-8">
                Your wallet is now securely connected to PesaPilot
              </p>

              <Card variant="safe" className="w-full p-4 mb-6">
                <div className="flex items-center gap-3">
                  <ShieldIcon size={24} className="text-success" />
                  <div className="text-left">
                    <p className="font-semibold text-caption">Wallet Protected</p>
                    <p className="text-micro text-muted-foreground">
                      Read-only access • No spending permissions
                    </p>
                  </div>
                </div>
              </Card>

              <Button variant="glow" size="lg" className="w-full" onClick={onConnect}>
                Continue to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
};
