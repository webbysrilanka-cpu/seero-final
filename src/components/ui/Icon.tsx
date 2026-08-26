import {
  Code2,
  Palette,
  Smartphone,
  Gauge,
  Search,
  Wrench,
  KeyRound,
  Receipt,
  Zap,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  smartphone: Smartphone,
  gauge: Gauge,
  search: Search,
  wrench: Wrench,
  key: KeyRound,
  receipt: Receipt,
  zap: Zap,
  message: MessageSquare,
};

export default function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
