import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
    <Card className="w-full max-w-xs overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-square bg-muted">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        <Badge className="absolute right-2 top-2" variant="secondary">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="line-clamp-1 text-lg font-semibold">{name}</h3>
        {description && <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>}
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
