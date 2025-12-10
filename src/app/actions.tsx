"use server";

import { streamUI } from "@ai-sdk/rsc";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { WeatherCard } from "@/components/ai-components/weather-card";
import { ProductCard } from "@/components/ai-components/product-card";
import { OrderTable } from "@/components/ai-components/order-table";
import { ChartCard } from "@/components/ai-components/chart-card";
import { MenuCard } from "@/components/ai-components/menu-card";
import {
  dummyWeatherData,
  dummyProducts,
  dummyOrders,
  dummyChartData,
  menuItems,
} from "@/lib/ai/data";

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2 p-4 text-muted-foreground">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span>로딩 중...</span>
    </div>
  );
}

// Chat action
export async function chat(userMessage: string) {
  const systemPrompt = `당신은 IntelliDeck의 AI 어시스턴트입니다. 사용자의 요청에 따라 적절한 UI 컴포넌트를 생성하여 보여줍니다.

당신이 할 수 있는 것들:
1. 날씨 정보 보여주기 (showWeather) - 서울, 부산, 제주, 대전, 강릉 지원
2. 상품 목록 보여주기 (showProducts) - 카테고리별 필터 가능
3. 주문 내역 보여주기 (showOrders) - 상태별 필터 가능
4. 메뉴 보여주기 (showMenu) - 사용 가능한 기능 안내
5. 차트 보여주기 (showChart) - 매출, 주문 추이 시각화
6. 테스트 버튼 보여주기 (showTestButton) - 클릭 가능한 버튼 테스트

규칙:
- 사용자가 "안녕", "하이", "헬로" 등 인사하면 반갑게 인사하고 메뉴를 보여주세요
- 무엇을 할 수 있는지 모르겠다고 하면 메뉴를 보여주세요
- 항상 친절하고 자연스럽게 대화하세요
- 도구를 사용할 때는 반드시 하나만 선택하세요`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tools: Record<string, any> = {
    showWeather: {
      description: "날씨 정보를 보여줍니다",
      parameters: z.object({
        city: z.string().describe("도시 이름 (서울, 부산, 제주, 대전, 강릉)"),
      }),
      generate: async function* ({ city }: { city: string }) {
        yield <LoadingSpinner />;
        const weather = dummyWeatherData[city] || dummyWeatherData["서울"];
        return <WeatherCard {...weather} />;
      },
    },
    showProducts: {
      description: "상품 목록을 보여줍니다",
      parameters: z.object({
        category: z.string().optional().describe("카테고리 필터"),
        limit: z.number().optional().describe("표시할 상품 수"),
      }),
      generate: async function* ({ category, limit = 6 }: { category?: string; limit?: number }) {
        yield <LoadingSpinner />;
        let products = dummyProducts;
        if (category) {
          products = products.filter((p) =>
            p.category.toLowerCase().includes(category.toLowerCase())
          );
        }
        const filteredProducts = products.slice(0, limit);
        const title = category ? `${category} 상품` : "추천 상품";

        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        );
      },
    },
    showOrders: {
      description: "주문 내역을 보여줍니다",
      parameters: z.object({
        status: z.string().optional().describe("주문 상태 필터"),
      }),
      generate: async function* ({ status }: { status?: string }) {
        yield <LoadingSpinner />;
        let orders = dummyOrders;
        if (status) {
          orders = orders.filter((o) => o.status === status);
        }
        return <OrderTable orders={orders} title="주문 내역" />;
      },
    },
    showMenu: {
      description: "사용 가능한 기능 메뉴를 보여줍니다",
      parameters: z.object({
        context: z.enum(["discovery", "help"]).optional().describe("메뉴 컨텍스트"),
      }),
      generate: async function* ({ context = "discovery" }: { context?: "discovery" | "help" }) {
        const items = context === "help" ? menuItems.help : menuItems.discovery.customer;
        return (
          <MenuCard
            title={context === "help" ? "도움말" : "무엇을 도와드릴까요?"}
            description={
              context === "help"
                ? "이렇게 말씀해보세요"
                : "아래 메뉴를 선택하거나 자유롭게 질문해주세요"
            }
            items={items}
          />
        );
      },
    },
    showChart: {
      description: "차트를 보여줍니다",
      parameters: z.object({
        chartType: z.enum(["line", "bar", "pie"]).optional().describe("차트 타입"),
        dataType: z.enum(["sales", "orders", "categories"]).describe("데이터 종류"),
      }),
      generate: async function* ({
        chartType = "bar",
        dataType = "sales",
      }: {
        chartType?: "line" | "bar" | "pie";
        dataType?: "sales" | "orders" | "categories";
      }) {
        yield <LoadingSpinner />;
        const validDataType = dataType && dummyChartData[dataType] ? dataType : "sales";
        const data = dummyChartData[validDataType];
        const titles: Record<string, string> = {
          sales: "월별 매출 추이",
          orders: "요일별 주문 현황",
          categories: "카테고리별 매출",
        };
        return <ChartCard title={titles[validDataType]} data={data} type={chartType} />;
      },
    },
    showTestButton: {
      description: "클릭 가능한 테스트 버튼을 보여줍니다",
      parameters: z.object({
        buttonText: z.string().optional().describe("버튼에 표시할 텍스트"),
      }),
      generate: async function* ({ buttonText = "클릭해보세요" }: { buttonText?: string }) {
        // 순수 HTML + data attribute 방식
        // 클라이언트에서 이벤트 위임으로 처리
        return (
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <h3 className="font-semibold">인터랙티브 버튼 테스트</h3>
            <p className="text-sm text-muted-foreground">아래 버튼을 클릭하면 알림이 표시됩니다:</p>
            <div className="flex gap-3">
              <button
                data-action="alert"
                data-message="버튼이 클릭되었습니다! 🎉"
                className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {buttonText}
              </button>
              <button
                data-action="alert"
                data-message="보조 버튼 클릭!"
                className="rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                보조 버튼
              </button>
              <button
                data-action="alert"
                data-message="아웃라인 버튼!"
                className="rounded-md border border-input bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                아웃라인
              </button>
            </div>
          </div>
        );
      },
    },
  };

  const result = await streamUI({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    prompt: userMessage,
    text: ({ content }: { content: string }) => (
      <div className="whitespace-pre-wrap">{content}</div>
    ),
    tools,
  });

  return result.value;
}
