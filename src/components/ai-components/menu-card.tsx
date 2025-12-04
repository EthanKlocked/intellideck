import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Cloud,
  Settings,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: "shopping" | "users" | "package" | "chart" | "weather" | "settings" | "help";
  action?: string;
}

interface MenuCardProps {
  title?: string;
  description?: string;
  items: MenuItem[];
}

const iconMap: Record<MenuItem["icon"], LucideIcon> = {
  shopping: ShoppingBag,
  users: Users,
  package: Package,
  chart: BarChart3,
  weather: Cloud,
  settings: Settings,
  help: HelpCircle,
};

export function MenuCard({ title, description, items }: MenuCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.id}
                className="flex flex-col items-start gap-2 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.title}</span>
                </div>
                <span className="text-left text-xs text-muted-foreground">{item.description}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
