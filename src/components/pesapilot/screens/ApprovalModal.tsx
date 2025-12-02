import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskMeter } from "@/components/pesapilot/RiskMeter";
import {
  WarningIcon,
  ShieldIcon,
  InfoIcon,
  CloseIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface ApprovalModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export const ApprovalModal = ({ isOpen = true, onClose, onApprove, onReject }: ApprovalModalProps) => {
  const approval = {
    dapp: "Unknown DeFi Protocol",
    token: "USDC",
    amount: "Unlimited",
    riskLevel: "high" as const,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[430px] bg-card border-t border-border rounded-t-3xl animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 rounded-full bg-muted" />
        </div>

        <div className="px-5 pb-safe-bottom pb-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <WarningIcon size={28} className="text-warning" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Token Approval</h3>
                <p className="text-caption text-muted-foreground">{approval.dapp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <CloseIcon size={20} />
            </Button>
          </div>

          {/* Warning Card */}
          <Card variant="danger" className="p-4">
            <div className="flex items-start gap-3">
              <WarningIcon size={20} className="text-destructive mt-0.5" />
              <div>
                <h4 className="font-semibold text-destructive mb-1">High-Risk Request</h4>
                <p className="text-caption">
                  This app wants <strong>unlimited access</strong> to spend your {approval.token}. 
                  Unknown contracts can drain your tokens.
                </p>
              </div>
            </div>
          </Card>

          {/* What This Means */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <InfoIcon size={18} className="text-primary" />
              What does this mean?
            </h4>
            <ul className="space-y-2 text-caption">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✕</span>
                <span>The app can spend ALL your USDC without asking again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">✕</span>
                <span>This permission doesn't expire</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning mt-0.5">!</span>
                <span>Unknown contract - we can't verify it's safe</span>
              </li>
            </ul>
          </div>

          {/* Risk Meter */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <RiskMeter level={approval.riskLevel} score={25} />
          </div>

          {/* Safe Alternative */}
          <Card variant="safe" className="p-4">
            <div className="flex items-start gap-3">
              <ShieldIcon size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-success mb-1">Safer Option</h4>
                <p className="text-caption text-muted-foreground">
                  Approve only the exact amount you need (e.g., 100 USDC) instead of unlimited.
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="success"
              size="lg"
              className="w-full"
              onClick={onApprove}
            >
              <ShieldIcon size={20} className="mr-2" />
              Approve Limited Amount
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={onApprove}
              >
                Approve All (Risky)
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={onReject}
              >
                Reject
              </Button>
            </div>
          </div>

          <p className="text-micro text-center text-muted-foreground">
            Proceed with caution — high-risk: unknown token
          </p>
        </div>
      </div>
    </div>
  );
};
