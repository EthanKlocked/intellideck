import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Mail, Calendar, Shield, ShieldCheck } from "lucide-react";

type Role = "ADMIN" | "CUSTOMER";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  isAdmin?: boolean;
}

export function UserCard({ name, email, role, createdAt }: UserCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
                {role === "ADMIN" ? (
                  <ShieldCheck className="w-3 h-3 mr-1" />
                ) : (
                  <Shield className="w-3 h-3 mr-1" />
                )}
                {role === "ADMIN" ? "관리자" : "고객"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>가입일: {formatDate(createdAt)}</span>
        </div>

        {/* Admin actions removed for server component */}
      </CardContent>
    </Card>
  );
}
