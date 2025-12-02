import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "default" | "error";
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "default",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-12">
      <div
        className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mb-6",
          variant === "default" ? "bg-secondary" : "bg-destructive/10"
        )}
      >
        {icon}
      </div>
      <h3 className="text-heading font-display mb-2">{title}</h3>
      <p className="text-caption text-muted-foreground max-w-xs mb-6">
        {description}
      </p>
      {actionLabel && (
        <Button
          variant={variant === "error" ? "destructive" : "default"}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// Pre-built empty states
export const NoTransactionsState = () => (
  <EmptyState
    icon={<span className="text-4xl">📭</span>}
    title="No Activity Yet"
    description="Your transaction history will appear here once you start using your wallet"
    actionLabel="Make First Transaction"
  />
);

export const NoWalletState = ({ onConnect }: { onConnect?: () => void }) => (
  <EmptyState
    icon={<span className="text-4xl">👛</span>}
    title="No Wallet Connected"
    description="Connect your wallet to start managing your crypto safely"
    actionLabel="Connect Wallet"
    onAction={onConnect}
  />
);

export const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={<span className="text-4xl">⚠️</span>}
    title="Something Went Wrong"
    description="We couldn't load your data. Please check your connection and try again."
    actionLabel="Try Again"
    onAction={onRetry}
    variant="error"
  />
);

export const NetworkErrorState = () => (
  <EmptyState
    icon={<span className="text-4xl">📡</span>}
    title="Network Error"
    description="Unable to connect to the blockchain. Please check your internet connection."
    actionLabel="Retry Connection"
    variant="error"
  />
);
