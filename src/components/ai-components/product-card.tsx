import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
}

export function ProductCard({
  name,
  description,
  price,
  stock,
  category,
  imageUrl,
}: ProductCardProps) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <Card className="w-full max-w-xs overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}
        <Badge className="absolute top-2 right-2" variant="secondary">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{formatCurrency(price)}</span>
          {isOutOfStock ? (
            <Badge variant="destructive">품절</Badge>
          ) : isLowStock ? (
            <Badge variant="warning">재고 {stock}개</Badge>
          ) : (
            <Badge variant="success">재고 있음</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-muted-foreground">
          {isOutOfStock ? "품절 상품입니다" : "장바구니에 담을 수 있습니다"}
        </div>
      </CardFooter>
    </Card>
  );
}
