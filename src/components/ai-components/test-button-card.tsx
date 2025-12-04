import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "./interactive-button";

interface TestButtonCardProps {
  title?: string;
  buttonText?: string;
}

export function TestButtonCard({
  title = "인터랙티브 버튼 테스트",
  buttonText = "클릭해보세요",
}: TestButtonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          아래 버튼을 클릭하면 알림이 표시됩니다:
        </p>
        <div className="flex gap-3">
          <InteractiveButton
            label={buttonText}
            message="버튼이 클릭되었습니다! 🎉"
            variant="primary"
          />
          <InteractiveButton
            label="보조 버튼"
            message="보조 버튼 클릭!"
            variant="secondary"
          />
          <InteractiveButton
            label="아웃라인"
            message="아웃라인 버튼!"
            variant="outline"
          />
        </div>
      </CardContent>
    </Card>
  );
}
