import { useState } from "react";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QRCodeIcon, CheckIcon, CloseIcon } from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface ReceiveScreenProps {
  onBack?: () => void;
}

export const ReceiveScreen = ({ onBack }: ReceiveScreenProps) => {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x1a2B...9f4E";
  const fullAddress = "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9f4E";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileFrame className="animated-gradient mesh-overlay">
      <div className="flex-1 flex flex-col screen-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center tap-scale"
          >
            <CloseIcon size={20} />
          </button>
          <h1 className="text-heading font-display">Receive Crypto</h1>
          <div className="w-10" />
        </div>

        {/* QR Code Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card variant="glass" className="p-8 rounded-3xl neon-border animate-fade-in">
            {/* QR Code Placeholder - In production, use a QR library */}
            <div className="w-56 h-56 bg-foreground rounded-2xl p-4 relative">
              <div className="w-full h-full bg-background rounded-xl flex items-center justify-center cyber-grid">
                <QRCodeIcon size={120} className="text-foreground" />
              </div>
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-secondary rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-secondary rounded-br-lg" />
            </div>
          </Card>

          {/* Wallet Address */}
          <div className="mt-8 text-center animate-fade-in animation-delay-200">
            <p className="text-caption text-muted-foreground mb-2">Your wallet address</p>
            <Card 
              variant="glass" 
              className="px-6 py-4 rounded-2xl cursor-pointer tap-scale hover-glow"
              onClick={handleCopy}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-body text-foreground">{walletAddress}</span>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                  copied ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                )}>
                  {copied ? <CheckIcon size={18} /> : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </div>
              </div>
            </Card>
            {copied && (
              <p className="text-caption text-success mt-2 animate-fade-in">
                Copied to clipboard!
              </p>
            )}
          </div>

          {/* Network Badge */}
          <div className="mt-6 animate-fade-in animation-delay-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30">
              <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
              <span className="text-caption text-secondary-foreground">Scroll Network</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-fade-in animation-delay-400">
          <Button 
            variant="glow" 
            size="lg" 
            className="w-full"
            onClick={handleCopy}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Address
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Share Address
          </Button>
        </div>

        {/* Info Note */}
        <p className="text-micro text-center text-muted-foreground mt-4">
          Only send Scroll-compatible tokens to this address
        </p>
      </div>
    </MobileFrame>
  );
};