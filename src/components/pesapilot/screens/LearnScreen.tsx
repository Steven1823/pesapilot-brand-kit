import { useState } from "react";
import { MobileFrame } from "@/components/pesapilot/MobileFrame";
import { BottomNav } from "@/components/pesapilot/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ShieldIcon, WalletIcon, SendIcon } from "@/components/icons/PesaPilotIcons";
import { cn } from "@/lib/utils";

interface LearnScreenProps {
  onNavigate?: (screen: string) => void;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  reward: string;
  duration: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  completed: boolean;
  progress?: number;
}

export const LearnScreen = ({ onNavigate }: LearnScreenProps) => {
  const [tutorials] = useState<Tutorial[]>([
    {
      id: "1",
      title: "What is a Wallet?",
      description: "Learn the basics of crypto wallets and how to keep them safe",
      reward: "5 XP",
      duration: "2 min",
      icon: WalletIcon,
      completed: true,
    },
    {
      id: "2",
      title: "Sending Your First Crypto",
      description: "Step-by-step guide to sending tokens safely",
      reward: "10 XP",
      duration: "3 min",
      icon: SendIcon,
      completed: false,
      progress: 60,
    },
    {
      id: "3",
      title: "Spotting Crypto Scams",
      description: "Learn to identify and avoid common scams",
      reward: "15 XP",
      duration: "5 min",
      icon: ShieldIcon,
      completed: false,
    },
    {
      id: "4",
      title: "Understanding Gas Fees",
      description: "What are gas fees and how to save on them",
      reward: "10 XP",
      duration: "4 min",
      icon: WalletIcon,
      completed: false,
    },
  ]);

  const totalXP = 35;
  const earnedXP = 5;

  return (
    <MobileFrame className="animated-gradient">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="screen-padding pb-4">
          <h1 className="text-display font-display mb-2">Learn & Earn</h1>
          <p className="text-caption text-muted-foreground">
            Complete tutorials to earn rewards
          </p>
        </div>

        {/* XP Progress Card */}
        <div className="px-5 mb-6">
          <Card variant="glass" className="p-5 rounded-2xl neon-border-purple animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-micro text-muted-foreground uppercase tracking-wide">Your Progress</p>
                <p className="text-display font-display text-gradient-primary">{earnedXP} XP</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center glow-secondary">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(earnedXP / totalXP) * 100}%`,
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))'
                  }}
                />
              </div>
              <p className="text-micro text-muted-foreground mt-2">
                {earnedXP} / {totalXP} XP to next level
              </p>
            </div>
          </Card>
        </div>

        {/* Tutorials List */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
          {tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            return (
              <Card 
                key={tutorial.id}
                variant="interactive"
                className={cn(
                  "p-4 rounded-2xl tap-scale animate-fade-in",
                  tutorial.completed && "border-success/30 bg-success/5"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                    tutorial.completed 
                      ? "bg-success/20 text-success" 
                      : "bg-primary/20 text-primary"
                  )}>
                    {tutorial.completed ? (
                      <CheckIcon size={28} />
                    ) : (
                      <Icon size={28} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-body truncate">{tutorial.title}</h3>
                      <Badge 
                        variant={tutorial.completed ? "success" : "info"}
                        className="flex-shrink-0"
                      >
                        {tutorial.completed ? "Done" : tutorial.reward}
                      </Badge>
                    </div>
                    <p className="text-caption text-muted-foreground line-clamp-2 mb-2">
                      {tutorial.description}
                    </p>
                    
                    {/* Progress or Duration */}
                    {tutorial.progress && !tutorial.completed ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${tutorial.progress}%` }}
                          />
                        </div>
                        <span className="text-micro text-primary">{tutorial.progress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-micro text-muted-foreground">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {tutorial.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Continue Button */}
                {!tutorial.completed && (
                  <Button 
                    variant={tutorial.progress ? "glow" : "outline"}
                    size="sm"
                    className="w-full mt-4"
                  >
                    {tutorial.progress ? "Continue" : "Start Tutorial"}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>

        {/* Streak Banner */}
        <div className="px-5 py-3">
          <Card variant="glass" className="p-4 rounded-2xl flex items-center gap-4">
            <div className="text-3xl">🔥</div>
            <div className="flex-1">
              <p className="font-semibold text-body">3 Day Streak!</p>
              <p className="text-caption text-muted-foreground">Keep learning daily for bonus XP</p>
            </div>
            <div className="text-2xl font-bold text-gradient-accent">+2x</div>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab="explore" onTabChange={(tab) => onNavigate?.(tab)} />
      </div>
    </MobileFrame>
  );
};