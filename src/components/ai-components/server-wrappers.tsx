// Server-compatible component for login prompt
// Used in streamUI context where client components can't be used directly

export function LoginPrompt({ description }: { description?: string }) {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">로그인</h3>
        <p className="text-sm text-muted-foreground">
          {description || "로그인하시면 더 많은 기능을 이용하실 수 있어요!"}
        </p>
      </div>
      <div className="mt-4 p-4 bg-muted rounded-md text-sm">
        <p className="font-medium mb-2">데모 계정:</p>
        <p>고객: chulsoo@example.com / demo123</p>
        <p>관리자: admin@intellideck.com / demo123</p>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        페이지 새로고침 후 다시 시도해주세요.
      </p>
    </div>
  );
}
