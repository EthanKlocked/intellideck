import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageType = "success" | "error" | "info" | "warning";

interface MessageCardProps {
  type?: MessageType;
  title?: string;
  message: string;
}

const config: Record<
  MessageType,
  { icon: typeof CheckCircle; className: string }
> = {
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-500/10 text-green-500",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-500/10 text-red-500",
  },
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10 text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
  },
};

export function MessageCard({
  type = "info",
  title,
  message,
}: MessageCardProps) {
  const { icon: Icon, className } = config[type];

  return (
    <Card className={cn("border", className)}>
      <CardContent className="flex items-start gap-3 p-4">
        <Icon className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="space-y-1">
          {title && <p className="font-medium">{title}</p>}
          <p className={cn("text-sm", title ? "text-foreground/80" : "")}>
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
