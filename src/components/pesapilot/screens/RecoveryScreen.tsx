import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import {
  KeyIcon,
  ShieldIcon,
  ProfileIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
} from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface RecoveryScreenProps {
  onBack?: () => void;
}

export const RecoveryScreen = ({ onBack }: RecoveryScreenProps) => {
  const [guardians, setGuardians] = useState<string[]>([]);
  const [newGuardian, setNewGuardian] = useState("");

  const addGuardian = () => {
    if (newGuardian && guardians.length < 3) {
      setGuardians([...guardians, newGuardian]);
      setNewGuardian("");
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-5 py-4 flex items-center gap-4 border-b border-border">
          <Button variant="ghost" size="icon-sm" onClick={onBack}>
            <CloseIcon size={20} />
          </Button>
          <h1 className="text-heading font-display">Recovery Setup</h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-5 py-6 space-y-6">
          {/* Explanation Card */}
          <Card variant="glass" className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <KeyIcon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-2">
                  What is Social Recovery?
                </h3>
                <p className="text-caption text-muted-foreground">
                  Instead of seed phrases, your wallet uses <strong>MPC (Multi-Party Computation)</strong>. 
                  Add trusted contacts who can help you recover your wallet if you lose access.
                </p>
              </div>
            </div>
          </Card>

          {/* How it Works */}
          <div>
            <h3 className="font-semibold mb-4">How it works</h3>
            <div className="space-y-3">
              {[
                { step: 1, text: "Add 2-3 trusted contacts (family, friends)" },
                { step: 2, text: "If you lose access, contacts verify it's you" },
                { step: 3, text: "2 of 3 approvals restore your wallet" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-caption font-bold">
                    {item.step}
                  </div>
                  <p className="text-caption">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guardians */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recovery Guardians</h3>
              <Badge variant={guardians.length >= 2 ? "success" : "warning"}>
                {guardians.length}/3 added
              </Badge>
            </div>

            {/* Added Guardians */}
            <div className="space-y-3 mb-4">
              {guardians.map((guardian, i) => (
                <Card key={i} variant="safe" className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <ProfileIcon size={20} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-caption">{guardian}</p>
                      <p className="text-micro text-muted-foreground">Guardian {i + 1}</p>
                    </div>
                    <CheckIcon size={20} className="text-success" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Guardian Input */}
            {guardians.length < 3 && (
              <div className="flex gap-3">
                <Input
                  variant="glass"
                  placeholder="Email or phone number"
                  value={newGuardian}
                  onChange={(e) => setNewGuardian(e.target.value)}
                  className="flex-1"
                />
                <Button variant="default" size="icon" onClick={addGuardian}>
                  <ArrowRightIcon size={20} />
                </Button>
              </div>
            )}
          </div>

          {/* Security Note */}
          <Card variant="default" className="p-4">
            <div className="flex items-start gap-3">
              <ShieldIcon size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-caption mb-1">Your Security</h4>
                <ul className="text-micro text-muted-foreground space-y-1">
                  <li>• Guardians never see your private keys</li>
                  <li>• They can only help YOU recover</li>
                  <li>• You can change guardians anytime</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Action */}
        <div className="px-5 py-4 border-t border-border">
          <Button
            variant="glow"
            size="lg"
            className="w-full"
            disabled={guardians.length < 2}
          >
            {guardians.length < 2 ? `Add ${2 - guardians.length} more guardian${guardians.length === 1 ? '' : 's'}` : "Complete Setup"}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};
