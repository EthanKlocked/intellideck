import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

interface OrderTableProps {
  orders: Order[];
  title?: string;
  isAdmin?: boolean;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning";
    icon: React.ElementType;
  }
> = {
  PENDING: { label: "대기중", variant: "warning", icon: Clock },
  CONFIRMED: { label: "확인됨", variant: "default", icon: CheckCircle },
  SHIPPED: { label: "배송중", variant: "secondary", icon: Truck },
  DELIVERED: { label: "배송완료", variant: "success", icon: Package },
  CANCELLED: { label: "취소됨", variant: "destructive", icon: XCircle },
};

export function OrderTable({ orders, title }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          주문 내역이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      <div className="space-y-3">
        {orders.map((order) => {
          const {
            label,
            variant,
            icon: StatusIcon,
          } = statusConfig[order.status];

          return (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-2 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-sm font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <Badge variant={variant}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {label}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDateTime(order.createdAt)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.productName} x {item.quantity}
                      </span>
                      <span className="text-muted-foreground">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>총액</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>

                {/* Admin actions - disabled in server component */}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
