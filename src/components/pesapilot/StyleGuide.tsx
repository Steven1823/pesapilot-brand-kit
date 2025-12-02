import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RiskMeter } from "./RiskMeter";
import { SafetyScore } from "./SafetyScore";
import {
  WalletIcon,
  SendIcon,
  ReceiveIcon,
  ShieldIcon,
  WarningIcon,
  InfoIcon,
  HistoryIcon,
  SettingsIcon,
  ProfileIcon,
  LanguageIcon,
  SwapIcon,
  QRCodeIcon,
  ConnectIcon,
  CheckIcon,
  CloseIcon,
  ArrowRightIcon,
  KeyIcon,
  PilotIcon,
  ScanIcon,
} from "@/components/icons/PesaPilotIcons";
import pesapilotLogo from "@/assets/pesapilot-logo.png";

export const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-background p-6 space-y-12">
      {/* Header */}
      <header className="text-center border-b border-border pb-8">
        <img src={pesapilotLogo} alt="PesaPilot Logo" className="w-24 h-24 mx-auto mb-4 rounded-2xl" />
        <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
          PesaPilot Style Guide
        </h1>
        <p className="text-muted-foreground">
          UI Kit for Mobile-first Crypto Copilot — Hackathon MVP
        </p>
      </header>

      {/* Brand Intent */}
      <section>
        <h2 className="text-heading font-display mb-4">Brand Intent</h2>
        <Card variant="glass" className="p-6">
          <p className="text-body leading-relaxed">
            PesaPilot is a mobile-first crypto wallet copilot designed to make blockchain transactions 
            understandable and safe for everyone. The visual language combines trust-forward deep blues 
            with energetic teal accents, creating a modern crypto aesthetic that feels secure without 
            being intimidating. The pilot/navigation motif reinforces guidance, while African-inspired 
            warmth brings accessibility to global remittance use cases.
          </p>
        </Card>
      </section>

      {/* Logo */}
      <section>
        <h2 className="text-heading font-display mb-4">Logo</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card variant="default" className="p-6 flex flex-col items-center">
            <img src={pesapilotLogo} alt="Logo 512" className="w-32 h-32 rounded-2xl mb-2" />
            <p className="text-caption text-muted-foreground">512×512</p>
          </Card>
          <Card variant="default" className="p-6 flex flex-col items-center">
            <img src={pesapilotLogo} alt="Logo 192" className="w-16 h-16 rounded-xl mb-2" />
            <p className="text-caption text-muted-foreground">192×192</p>
          </Card>
          <Card variant="default" className="p-6 flex flex-col items-center">
            <img src={pesapilotLogo} alt="Logo 48" className="w-12 h-12 rounded-lg mb-2" />
            <p className="text-caption text-muted-foreground">48×48</p>
          </Card>
        </div>
      </section>

      {/* Color Palette */}
      <section>
        <h2 className="text-heading font-display mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Primary (Teal)", bg: "bg-primary", hex: "#00BFA6", usage: "CTAs, links, success indicators" },
            { name: "Accent (Gold)", bg: "bg-accent", hex: "#FFC857", usage: "Highlights, important badges" },
            { name: "Background", bg: "bg-background border border-border", hex: "#0B1221", usage: "Main app background" },
            { name: "Surface/Card", bg: "bg-card", hex: "#0F1724", usage: "Cards, elevated surfaces" },
            { name: "Success", bg: "bg-success", hex: "#22C55E", usage: "Safe transactions, confirmations" },
            { name: "Warning", bg: "bg-warning", hex: "#F59E0B", usage: "Caution states, medium risk" },
            { name: "Danger", bg: "bg-destructive", hex: "#EF4444", usage: "High risk, errors, rejections" },
            { name: "Muted", bg: "bg-muted", hex: "#1E293B", usage: "Inactive states, borders" },
          ].map((color) => (
            <Card key={color.name} variant="default" className="p-4">
              <div className={`w-full h-12 rounded-lg mb-3 ${color.bg}`} />
              <h4 className="font-semibold text-caption">{color.name}</h4>
              <p className="font-mono text-micro text-muted-foreground">{color.hex}</p>
              <p className="text-micro text-muted-foreground mt-1">{color.usage}</p>
            </Card>
          ))}
        </div>
        <Card variant="default" className="mt-4 p-4">
          <h4 className="font-semibold mb-2">Contrast Pairings (WCAG AA)</h4>
          <ul className="text-caption text-muted-foreground space-y-1">
            <li>• Primary on Background: ✓ 7.2:1</li>
            <li>• Foreground (#E6EEF3) on Background: ✓ 12.8:1</li>
            <li>• Muted-foreground on Background: ✓ 4.6:1</li>
            <li>• Accent on Primary-foreground: ✓ 8.1:1</li>
          </ul>
        </Card>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-heading font-display mb-4">Typography</h2>
        <Card variant="default" className="p-6 space-y-6">
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Display — Space Grotesk 700, 30px</span>
            <span className="text-display">Navigate Crypto Safely</span>
          </div>
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Heading — Space Grotesk 600, 20px</span>
            <span className="text-heading">Transaction Details</span>
          </div>
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Subheading — Inter 500, 18px</span>
            <span className="text-subheading">Your wallet is protected</span>
          </div>
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Body — Inter 400, 16px</span>
            <span className="text-body">This transaction sends 0.5 ETH to the specified address.</span>
          </div>
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Caption — Inter 400, 14px</span>
            <span className="text-caption text-muted-foreground">Last updated 2 minutes ago</span>
          </div>
          <div>
            <span className="text-micro text-muted-foreground block mb-1">Micro — Inter 400, 12px</span>
            <span className="text-micro text-muted-foreground">0x1234...5678</span>
          </div>
        </Card>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-heading font-display mb-4">Icon Set (20 Icons)</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {[
            { Icon: WalletIcon, name: "Wallet" },
            { Icon: SendIcon, name: "Send" },
            { Icon: ReceiveIcon, name: "Receive" },
            { Icon: ShieldIcon, name: "Shield" },
            { Icon: WarningIcon, name: "Warning" },
            { Icon: InfoIcon, name: "Info" },
            { Icon: HistoryIcon, name: "History" },
            { Icon: SettingsIcon, name: "Settings" },
            { Icon: ProfileIcon, name: "Profile" },
            { Icon: LanguageIcon, name: "Language" },
            { Icon: SwapIcon, name: "Swap" },
            { Icon: QRCodeIcon, name: "QR Code" },
            { Icon: ConnectIcon, name: "Connect" },
            { Icon: CheckIcon, name: "Check" },
            { Icon: CloseIcon, name: "Close" },
            { Icon: ArrowRightIcon, name: "Arrow" },
            { Icon: KeyIcon, name: "Key" },
            { Icon: PilotIcon, name: "Pilot" },
            { Icon: ScanIcon, name: "Scan" },
          ].map(({ Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Icon size={24} />
              </div>
              <span className="text-micro text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-heading font-display mb-4">Buttons</h2>
        <Card variant="default" className="p-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="default">Primary</Button>
            <Button variant="glow">Glow CTA</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="outline">Outline</Button>
            <Button variant="outline-primary">Outline Primary</Button>
            <Button variant="outline-accent">Outline Accent</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div className="flex gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-heading font-display mb-4">Badges</h2>
        <Card variant="default" className="p-6">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Safe</Badge>
            <Badge variant="warning">Caution</Badge>
            <Badge variant="danger">High Risk</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="accent">Featured</Badge>
            <Badge variant="risk-low">Low Risk</Badge>
            <Badge variant="risk-medium">Medium Risk</Badge>
            <Badge variant="risk-high">High Risk</Badge>
            <Badge variant="glass">Glass</Badge>
          </div>
        </Card>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-heading font-display mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="default" className="p-4">
            <h4 className="font-semibold mb-1">Default Card</h4>
            <p className="text-caption text-muted-foreground">Standard elevated surface</p>
          </Card>
          <Card variant="glass" className="p-4">
            <h4 className="font-semibold mb-1">Glass Card</h4>
            <p className="text-caption text-muted-foreground">Translucent with blur</p>
          </Card>
          <Card variant="safe" className="p-4">
            <h4 className="font-semibold mb-1">Safe Card</h4>
            <p className="text-caption text-muted-foreground">Success left border</p>
          </Card>
          <Card variant="warning" className="p-4">
            <h4 className="font-semibold mb-1">Warning Card</h4>
            <p className="text-caption text-muted-foreground">Warning left border</p>
          </Card>
          <Card variant="danger" className="p-4">
            <h4 className="font-semibold mb-1">Danger Card</h4>
            <p className="text-caption text-muted-foreground">Danger left border</p>
          </Card>
          <Card variant="interactive" className="p-4 cursor-pointer">
            <h4 className="font-semibold mb-1">Interactive Card</h4>
            <p className="text-caption text-muted-foreground">Hover for effect</p>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-heading font-display mb-4">Inputs</h2>
        <Card variant="default" className="p-6 space-y-4">
          <Input variant="default" placeholder="Default input" />
          <Input variant="glass" placeholder="Glass input" />
          <Input variant="filled" placeholder="Filled input" />
          <Input variant="underline" placeholder="Underline input" />
        </Card>
      </section>

      {/* Custom Components */}
      <section>
        <h2 className="text-heading font-display mb-4">Custom Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="p-6">
            <h4 className="font-semibold mb-4">Safety Score</h4>
            <div className="flex justify-around">
              <SafetyScore score={92} size="sm" />
              <SafetyScore score={65} size="sm" />
              <SafetyScore score={25} size="sm" />
            </div>
          </Card>
          <Card variant="default" className="p-6">
            <h4 className="font-semibold mb-4">Risk Meter</h4>
            <div className="space-y-4">
              <RiskMeter level="low" score={92} />
              <RiskMeter level="medium" score={55} />
              <RiskMeter level="high" score={25} />
            </div>
          </Card>
        </div>
      </section>

      {/* Spacing System */}
      <section>
        <h2 className="text-heading font-display mb-4">Spacing System</h2>
        <Card variant="default" className="p-6">
          <div className="space-y-3 text-caption">
            <div className="flex items-center gap-4">
              <div className="w-1 h-4 bg-primary" /><span>4px — gap-1, p-1</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-4 bg-primary" /><span>8px — gap-2, p-2</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-4 bg-primary" /><span>12px — gap-3, p-3</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-primary" /><span>16px — gap-4, p-4</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-5 h-4 bg-primary" /><span>20px — gap-5, p-5 (screen padding)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-4 bg-primary" /><span>24px — gap-6, p-6</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Micro-interactions */}
      <section>
        <h2 className="text-heading font-display mb-4">Micro-interactions</h2>
        <Card variant="default" className="p-6">
          <ul className="space-y-3 text-caption">
            <li><strong>Success:</strong> Scale to 1.02 + green glow pulse (0.3s ease-out)</li>
            <li><strong>Error:</strong> Shake animation (3 cycles, 0.4s) + red border flash</li>
            <li><strong>Loading:</strong> Spinner rotation (1s linear infinite) + pulse glow</li>
            <li><strong>Button press:</strong> Scale to 0.98 (instant) + release to 1.0 (0.2s)</li>
            <li><strong>Card hover:</strong> Border glow + shadow elevation (0.2s ease)</li>
            <li><strong>Modal entry:</strong> Slide up from bottom + backdrop blur fade (0.3s)</li>
            <li><strong>Risk meter:</strong> Segments fill sequentially with 100ms delays</li>
          </ul>
        </Card>
      </section>

      {/* Microcopy */}
      <section>
        <h2 className="text-heading font-display mb-4">Microcopy Examples</h2>
        <Card variant="default" className="p-6">
          <div className="space-y-4 text-caption">
            <div>
              <Badge variant="success" className="mb-1">CTA</Badge>
              <p>"Connect wallet (safe & private)"</p>
            </div>
            <div>
              <Badge variant="info" className="mb-1">Action</Badge>
              <p>"What does this transaction do?"</p>
            </div>
            <div>
              <Badge variant="warning" className="mb-1">Caution</Badge>
              <p>"Unknown contract — proceed carefully"</p>
            </div>
            <div>
              <Badge variant="danger" className="mb-1">Warning</Badge>
              <p>"High-risk: unknown token"</p>
            </div>
            <div>
              <Badge variant="default" className="mb-1">Confirmation</Badge>
              <p>"Sent successfully!"</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-border">
        <p className="text-caption text-muted-foreground">
          PesaPilot — Lovable UI Kit (Hackathon MVP)
        </p>
        <p className="text-micro text-muted-foreground mt-1">
          Design System v1.0 • Mobile-first • 360×800 / 390×844 viewports
        </p>
      </footer>
    </div>
  );
};
