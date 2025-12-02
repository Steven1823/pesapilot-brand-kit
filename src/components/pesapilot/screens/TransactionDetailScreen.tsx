import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { RiskMeter } from "@/components/pesapilot/RiskMeter";
import {
  ArrowRightIcon,
  CloseIcon,
  InfoIcon,
  ShieldIcon,
  WarningIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface TransactionDetailScreenProps {
  onBack?: () => void;
  onExplain?: () => void;
}

export const TransactionDetailScreen = ({ onBack, onExplain }: TransactionDetailScreenProps) => {
  const transaction = {
    type: "send",
    amount: "0.5",
    token: "ETH",
    usdValue: "1,225.00",
    from: "0x1234...5678",
    to: "0xabcd...efgh",
    network: "Scroll",
    gas: "0.002 ETH",
    timestamp: "Dec 2, 2025, 2:30 PM",
    hash: "0x9876...4321",
    status: "pending" as const,
    riskLevel: "low" as const,
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between border-b border-border">
          <Button variant="ghost" size="icon-sm" onClick={onBack}>
            <CloseIcon size={20} />
          </Button>
          <span className="font-display font-semibold">Transaction Details</span>
          <Button variant="ghost" size="icon-sm">
            <InfoIcon size={20} />
          </Button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-5 py-6 space-y-6">
          {/* Amount Display */}
          <div className="text-center py-6">
            <Badge variant="info" className="mb-4">
              {transaction.status === "pending" ? "Pending" : "Confirmed"}
            </Badge>
            <div className="text-4xl font-display font-bold mb-2">
              -{transaction.amount} {transaction.token}
            </div>
            <p className="text-muted-foreground">≈ ${transaction.usdValue} USD</p>
          </div>

          {/* Risk Assessment */}
          <Card variant="safe" className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <ShieldIcon size={24} className="text-success mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Transaction Safe</h4>
                <p className="text-caption text-muted-foreground">
                  This looks like a standard transfer to a known address
                </p>
              </div>
            </div>
            <RiskMeter level={transaction.riskLevel} score={92} />
          </Card>

          {/* AI Explanation Button */}
          <Button
            variant="outline-primary"
            size="lg"
            className="w-full"
            onClick={onExplain}
          >
            <InfoIcon size={20} className="mr-2" />
            What does this transaction do?
          </Button>

          {/* Transaction Details */}
          <Card variant="default" className="p-0 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h4 className="font-semibold text-caption text-muted-foreground uppercase tracking-wide">
                Details
              </h4>
            </div>
            <div className="divide-y divide-border">
              {[
                { label: "From", value: transaction.from },
                { label: "To", value: transaction.to },
                { label: "Network", value: transaction.network },
                { label: "Gas Fee", value: transaction.gas },
                { label: "Time", value: transaction.timestamp },
                { label: "Hash", value: transaction.hash },
              ].map((item) => (
                <div key={item.label} className="px-4 py-3 flex justify-between items-center">
                  <span className="text-caption text-muted-foreground">{item.label}</span>
                  <span className="text-caption font-medium font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Raw Data Toggle */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-3 text-caption text-muted-foreground hover:text-foreground transition-colors">
              <span>View Raw Transaction Data</span>
              <ArrowRightIcon
                size={16}
                className="transform transition-transform group-open:rotate-90"
              />
            </summary>
            <Card variant="outline" className="mt-2 p-4">
              <pre className="text-micro text-muted-foreground font-mono overflow-auto">
{`{
  "from": "0x1234567890abcdef...",
  "to": "0xabcdef1234567890...",
  "value": "500000000000000000",
  "gas": "21000",
  "gasPrice": "20000000000",
  "nonce": 42,
  "chainId": 534351
}`}
              </pre>
            </Card>
          </details>
        </div>

        {/* Bottom Actions */}
        <div className="px-5 py-4 border-t border-border space-y-3">
          <Button variant="glow" size="lg" className="w-full">
            Track on Explorer
          </Button>
          <Button variant="ghost" size="lg" className="w-full text-destructive">
            Cancel Transaction
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};
