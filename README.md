# IntelliDeck

AI 기반 Generative UI 플랫폼 - `@ai-sdk/rsc`의 `streamUI`를 활용하여 동적으로 React 컴포넌트를 생성하는 Next.js 애플리케이션

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **AI**: Vercel AI SDK (`@ai-sdk/rsc`, `@ai-sdk/google`) + Google Gemini
- **UI**: Tailwind CSS, Radix UI, shadcn/ui
- **Database**: PostgreSQL + Prisma
- **Language**: TypeScript

## 빠른 시작

### Docker로 실행 (권장)

```bash
# 1. 환경변수 설정
cp .env.example .env
# .env 파일에 GOOGLE_GENERATIVE_AI_API_KEY 입력

# 2. 실행
docker compose up --build
```

http://localhost:3000 접속

### 로컬 개발

```bash
npm install
npm run dev
```

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── chat-client.tsx   # 채팅 UI (Client Component)
│   └── actions.tsx       # streamUI + 도구 정의 (Server Action)
├── components/
│   ├── ui/               # shadcn/ui 컴포넌트
│   └── ai-components/    # AI가 생성하는 UI (Server Components)
│       ├── weather-card.tsx
│       ├── product-card.tsx
│       ├── order-table.tsx
│       ├── chart-card.tsx
│       └── menu-card.tsx
└── lib/
    └── ai/data.ts        # 더미 데이터
```

## 사용 가능한 도구

| 도구             | 설명        | 예시 질문          |
| ---------------- | ----------- | ------------------ |
| `showWeather`    | 날씨 카드   | "서울 날씨 알려줘" |
| `showProducts`   | 상품 목록   | "상품 보여줘"      |
| `showOrders`     | 주문 내역   | "주문 내역 확인"   |
| `showChart`      | 차트        | "매출 차트 보여줘" |
| `showMenu`       | 메뉴        | "뭘 할 수 있어?"   |
| `showTestButton` | 클릭 테스트 | "버튼 테스트"      |

## streamUI 제약사항

`streamUI`의 tool에서 반환하는 컴포넌트는 **순수 Server Component**만 가능합니다.

`"use client"` 컴포넌트를 반환하면 에러 발생:

```
Error: Could not find the module in the React Client Manifest
```

### 해결책: Event Delegation

Server Component에서 `data-*` 속성으로 HTML 반환 → 클라이언트에서 이벤트 위임 처리

```tsx
// Server: data-* 속성 사용
<button data-action="alert" data-message="클릭!">
  버튼
</button>;

// Client: 이벤트 위임
useEffect(() => {
  const handler = (e) => {
    if (e.target.dataset.action === "alert") {
      alert(e.target.dataset.message);
    }
  };
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}, []);
```

## 스크립트

| 명령어              | 설명             |
| ------------------- | ---------------- |
| `npm run dev`       | 개발 서버        |
| `npm run build`     | 프로덕션 빌드    |
| `npm run start`     | 프로덕션 서버    |
| `npm run db:push`   | DB 스키마 동기화 |
| `npm run db:studio` | Prisma Studio    |
