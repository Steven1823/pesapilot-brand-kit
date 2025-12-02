import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { RiskMeter } from "@/components/pesapilot/RiskMeter";
import {
  SendIcon,
  CloseIcon,
  ScanIcon,
  ShieldIcon,
  CheckIcon,
  InfoIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface SendScreenProps {
  onBack?: () => void;
  onSend?: () => void;
}

export const SendScreen = ({ onBack, onSend }: SendScreenProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    setStep(2);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setStep(3);
    setSending(false);
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-5 py-4 flex items-center gap-4 border-b border-border">
          <Button variant="ghost" size="icon-sm" onClick={onBack}>
            <CloseIcon size={20} />
          </Button>
          <h1 className="text-heading font-display">Send</h1>
          <Badge variant="info" className="ml-auto">Scroll Testnet</Badge>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-5 py-6">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Token Selection */}
              <Card variant="interactive" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                      Ξ
                    </div>
                    <div>
                      <p className="font-semibold">Ethereum</p>
                      <p className="text-caption text-muted-foreground">Balance: 1.5 ETH</p>
                    </div>
                  </div>
                  <Badge variant="secondary">ETH</Badge>
                </div>
              </Card>

              {/* Amount Input */}
              <div>
                <label className="text-caption text-muted-foreground mb-2 block">Amount</label>
                <div className="relative">
                  <Input
                    variant="glass"
                    inputSize="lg"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-display pr-16"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-semibold text-caption">
                    MAX
                  </button>
                </div>
                <p className="text-caption text-muted-foreground mt-2">
                  ≈ ${(parseFloat(amount || "0") * 2450).toFixed(2)} USD
                </p>
              </div>

              {/* Recipient Input */}
              <div>
                <label className="text-caption text-muted-foreground mb-2 block">Recipient</label>
                <div className="flex gap-3">
                  <Input
                    variant="glass"
                    placeholder="0x... or ENS name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="flex-1 font-mono"
                  />
                  <Button variant="secondary" size="icon">
                    <ScanIcon size={20} />
                  </Button>
                </div>
              </div>

              {/* Safety Check */}
              {recipient && (
                <Card variant="safe" className="p-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <ShieldIcon size={20} className="text-success mt-0.5" />
                    <div>
                      <p className="font-semibold text-caption text-success">Address Verified</p>
                      <p className="text-micro text-muted-foreground">
                        Known address with 42 previous transactions
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Gas Estimate */}
              <Card variant="default" className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-caption text-muted-foreground">Network Fee</span>
                  <span className="font-semibold">~0.002 ETH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-caption text-muted-foreground">Est. Time</span>
                  <span className="font-semibold">~30 seconds</span>
                </div>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-heading mb-2">Processing...</h2>
              <p className="text-caption text-muted-foreground max-w-xs">
                Your transaction is being submitted to the Scroll network
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-24 h-24 mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <CheckIcon size={48} className="text-success" />
              </div>
              <h2 className="text-heading mb-2">Sent Successfully!</h2>
              <p className="text-caption text-muted-foreground max-w-xs mb-6">
                Your transaction has been confirmed on the network
              </p>

              <Card variant="default" className="w-full p-4 text-left">
                <div className="space-y-3 text-caption">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">{amount} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-mono">{recipient.slice(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span>0.002 ETH</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="px-5 py-4 border-t border-border">
          {step === 1 && (
            <Button
              variant="glow"
              size="lg"
              className="w-full"
              disabled={!amount || !recipient}
              onClick={handleSend}
            >
              <SendIcon size={20} className="mr-2" />
              Review Transaction
            </Button>
          )}
          {step === 3 && (
            <div className="space-y-3">
              <Button variant="outline" size="lg" className="w-full">
                View on Explorer
              </Button>
              <Button variant="glow" size="lg" className="w-full" onClick={onBack}>
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
};
