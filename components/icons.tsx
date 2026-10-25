import { BrainCircuit, ChartNoAxesCombined, Code2, Compass, LayoutDashboard, MessageSquare, Megaphone, Network, PenLine, ShieldCheck, Sparkles, Target, Users, Workflow } from 'lucide-react';

const icons = { brain: BrainCircuit, chart: ChartNoAxesCombined, code: Code2, compass: Compass, layout: LayoutDashboard, message: MessageSquare, megaphone: Megaphone, network: Network, pen: PenLine, shield: ShieldCheck, sparkles: Sparkles, target: Target, users: Users, workflow: Workflow };

export function FeatureIcon({ name, size = 23 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.65} aria-hidden="true" />;
}
