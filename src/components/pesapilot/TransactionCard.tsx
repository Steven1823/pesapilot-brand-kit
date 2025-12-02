import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SendIcon, ReceiveIcon, SwapIcon } from "@/components/icons/PesaPilotIcons";

interface TransactionCardProps {
  type: "send" | "receive" | "swap";
  amount: string;
  token: string;
  address: string;
  timestamp: string;
  status: "pending" | "confirmed" | "failed";
  onClick?: () => void;
}

export const TransactionCard = ({
  type,
  amount,
  token,
  address,
  timestamp,
  status,
  onClick,
}: TransactionCardProps) => {
  const icons = {
    send: SendIcon,
    receive: ReceiveIcon,
    swap: SwapIcon,
  };

  const labels = {
    send: "Sent",
    receive: "Received",
    swap: "Swapped",
  };

  const iconColors = {
    send: "bg-destructive/20 text-destructive",
    receive: "bg-success/20 text-success",
    swap: "bg-primary/20 text-primary",
  };

  const statusVariants = {
    pending: "warning" as const,
    confirmed: "success" as const,
    failed: "danger" as const,
  };

  const Icon = icons[type];

  return (
    <Card
      variant="interactive"
      className="p-4"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconColors[type])}>
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">{labels[type]}</span>
            <span className={cn(
              "font-bold font-display",
              type === "send" ? "text-destructive" : "text-success"
            )}>
              {type === "send" ? "-" : "+"}{amount} {token}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="text-caption text-muted-foreground truncate">
              {address}
            </span>
            <Badge variant={statusVariants[status]} className="text-micro">
              {status}
            </Badge>
          </div>
          <span className="text-micro text-muted-foreground mt-1 block">
            {timestamp}
          </span>
        </div>
      </div>
    </Card>
  );
};
