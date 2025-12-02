import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InfoIcon,
  ShieldIcon,
  CloseIcon,
  CheckIcon,
  WarningIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface ExplainOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  onProceed?: () => void;
}

export const ExplainOverlay = ({ isOpen = true, onClose, onProceed }: ExplainOverlayProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const explanation = {
    summary: "You're sending 0.5 ETH to another wallet",
    details: [
      {
        icon: CheckIcon,
        text: "The recipient address looks valid and has previous activity",
        type: "safe",
      },
      {
        icon: CheckIcon,
        text: "Standard transfer with normal gas fees",
        type: "safe",
      },
      {
        icon: InfoIcon,
        text: "This is a one-way transfer and cannot be reversed",
        type: "info",
      },
    ],
    recommendation: "This transaction appears safe to proceed.",
    riskLevel: "low" as const,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Overlay */}
      <div className="relative w-full max-w-[430px] bg-card border-t border-border rounded-t-3xl animate-slide-up max-h-[85vh] overflow-auto">
        {/* Handle */}
        <div className="flex justify-center py-3 sticky top-0 bg-card">
          <div className="w-12 h-1.5 rounded-full bg-muted" />
        </div>

        <div className="px-5 pb-safe-bottom pb-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <InfoIcon size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">AI Explanation</h3>
                <p className="text-caption text-muted-foreground">Powered by PesaPilot</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <CloseIcon size={20} />
            </Button>
          </div>

          {/* Summary */}
          <Card variant="glass" className="p-4">
            <p className="font-semibold text-lg">{explanation.summary}</p>
          </Card>

          {/* Detailed Breakdown */}
          <div>
            <h4 className="font-semibold mb-3 text-caption text-muted-foreground uppercase tracking-wide">
              What we found
            </h4>
            <div className="space-y-3">
              {explanation.details.map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl animate-fade-in",
                      detail.type === "safe" && "bg-success/10",
                      detail.type === "info" && "bg-primary/10",
                      detail.type === "warning" && "bg-warning/10"
                    )}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Icon
                      size={20}
                      className={cn(
                        "mt-0.5",
                        detail.type === "safe" && "text-success",
                        detail.type === "info" && "text-primary",
                        detail.type === "warning" && "text-warning"
                      )}
                    />
                    <p className="text-caption">{detail.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendation */}
          <Card variant="safe" className="p-4">
            <div className="flex items-start gap-3">
              <ShieldIcon size={24} className="text-success" />
              <div>
                <Badge variant="success" className="mb-2">Recommended</Badge>
                <p className="text-body">{explanation.recommendation}</p>
              </div>
            </div>
          </Card>

          {/* Plain Language Toggle */}
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
            <span className="text-caption">Simplify explanation</span>
            <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground" />
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="glow"
              size="lg"
              className="w-full"
              onClick={onProceed}
            >
              <CheckIcon size={20} className="mr-2" />
              Proceed with Transaction
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              Review Again
            </Button>
          </div>

          <p className="text-micro text-center text-muted-foreground">
            This explanation is AI-generated. Always verify before signing.
          </p>
        </div>
      </div>
    </div>
  );
};
