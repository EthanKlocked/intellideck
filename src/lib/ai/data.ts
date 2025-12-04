// Dummy data for the prototype
// In production, these would come from the database

export const dummyWeatherData: Record<
  string,
  {
    city: string;
    temperature: number;
    humidity: number;
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";
    description: string;
  }
> = {
  서울: {
    city: "서울",
    temperature: 12,
    humidity: 45,
    condition: "cloudy",
    description: "구름이 많고 선선한 날씨입니다.",
  },
  부산: {
    city: "부산",
    temperature: 18,
    humidity: 60,
    condition: "sunny",
    description: "맑고 따뜻한 날씨입니다.",
  },
  제주: {
    city: "제주",
    temperature: 20,
    humidity: 70,
    condition: "rainy",
    description: "비가 오고 있습니다. 우산을 챙기세요.",
  },
  대전: {
    city: "대전",
    temperature: 14,
    humidity: 50,
    condition: "cloudy",
    description: "흐린 날씨입니다.",
  },
  강릉: {
    city: "강릉",
    temperature: 8,
    humidity: 55,
    condition: "snowy",
    description: "눈이 내리고 있습니다.",
  },
};

export const dummyProducts: Array<{
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
}> = [
  {
    id: "prod_1",
    name: "무선 블루투스 이어폰",
    description: "고품질 사운드와 긴 배터리 수명",
    price: 89000,
    stock: 45,
    category: "전자기기",
    imageUrl: null,
  },
  {
    id: "prod_2",
    name: "스마트 워치 Pro",
    description: "건강 모니터링과 알림 기능 탑재",
    price: 299000,
    stock: 12,
    category: "전자기기",
    imageUrl: null,
  },
  {
    id: "prod_3",
    name: "프리미엄 가죽 지갑",
    description: "이탈리안 소가죽 100%",
    price: 75000,
    stock: 30,
    category: "패션",
    imageUrl: null,
  },
  {
    id: "prod_4",
    name: "스테인리스 텀블러",
    description: "24시간 보온/보냉",
    price: 35000,
    stock: 100,
    category: "생활용품",
    imageUrl: null,
  },
  {
    id: "prod_5",
    name: "에어프라이어 5L",
    description: "대용량 에어프라이어",
    price: 129000,
    stock: 0,
    category: "가전",
    imageUrl: null,
  },
  {
    id: "prod_6",
    name: "요가 매트",
    description: "친환경 TPE 소재",
    price: 28000,
    stock: 3,
    category: "스포츠",
    imageUrl: null,
  },
];

export const dummyOrders = [
  {
    id: "ord_abc12345",
    status: "DELIVERED" as const,
    totalAmount: 124000,
    createdAt: "2024-11-28T10:30:00Z",
    items: [
      { productName: "무선 블루투스 이어폰", quantity: 1, price: 89000 },
      { productName: "스테인리스 텀블러", quantity: 1, price: 35000 },
    ],
  },
  {
    id: "ord_def67890",
    status: "SHIPPED" as const,
    totalAmount: 299000,
    createdAt: "2024-12-01T14:20:00Z",
    items: [{ productName: "스마트 워치 Pro", quantity: 1, price: 299000 }],
  },
  {
    id: "ord_ghi11111",
    status: "PENDING" as const,
    totalAmount: 103000,
    createdAt: "2024-12-01T16:45:00Z",
    items: [
      { productName: "프리미엄 가죽 지갑", quantity: 1, price: 75000 },
      { productName: "요가 매트", quantity: 1, price: 28000 },
    ],
  },
];

export const dummyUsers = [
  {
    id: "user_1",
    name: "김철수",
    email: "chulsoo@example.com",
    role: "CUSTOMER" as const,
    createdAt: "2024-06-15T09:00:00Z",
  },
  {
    id: "user_2",
    name: "이영희",
    email: "younghee@example.com",
    role: "CUSTOMER" as const,
    createdAt: "2024-08-22T11:30:00Z",
  },
  {
    id: "user_admin",
    name: "관리자",
    email: "admin@intellideck.com",
    role: "ADMIN" as const,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const dummyStats = {
  overview: [
    {
      title: "총 매출",
      value: "₩12,450,000",
      trend: "up" as const,
      trendValue: "+12.5%",
      description: "지난달 대비",
    },
    {
      title: "총 주문",
      value: "156건",
      trend: "up" as const,
      trendValue: "+8.2%",
      description: "지난달 대비",
    },
    {
      title: "신규 고객",
      value: "42명",
      trend: "down" as const,
      trendValue: "-3.1%",
      description: "지난달 대비",
    },
    {
      title: "평균 주문액",
      value: "₩79,800",
      trend: "neutral" as const,
      trendValue: "+0.5%",
      description: "지난달 대비",
    },
  ],
  sales: [
    {
      title: "일 매출",
      value: "₩1,250,000",
      trend: "up" as const,
      trendValue: "+5.2%",
    },
    {
      title: "주간 매출",
      value: "₩8,750,000",
      trend: "up" as const,
      trendValue: "+10.1%",
    },
    {
      title: "월간 매출",
      value: "₩12,450,000",
      trend: "up" as const,
      trendValue: "+12.5%",
    },
    {
      title: "분기 매출",
      value: "₩35,200,000",
      trend: "up" as const,
      trendValue: "+15.3%",
    },
  ],
  orders: [
    { title: "대기중", value: "23건", trend: "neutral" as const },
    {
      title: "배송중",
      value: "45건",
      trend: "up" as const,
      trendValue: "+12건",
    },
    { title: "완료", value: "88건", trend: "up" as const, trendValue: "+8건" },
    { title: "취소", value: "5건", trend: "down" as const, trendValue: "-2건" },
  ],
  users: [
    {
      title: "전체 회원",
      value: "1,234명",
      trend: "up" as const,
      trendValue: "+42명",
    },
    {
      title: "활성 회원",
      value: "892명",
      trend: "up" as const,
      trendValue: "+15명",
    },
    {
      title: "신규 가입",
      value: "42명",
      trend: "down" as const,
      trendValue: "-3명",
    },
    {
      title: "VIP 회원",
      value: "56명",
      trend: "up" as const,
      trendValue: "+5명",
    },
  ],
};

export const dummyChartData = {
  sales: [
    { name: "1월", value: 2400000 },
    { name: "2월", value: 1398000 },
    { name: "3월", value: 9800000 },
    { name: "4월", value: 3908000 },
    { name: "5월", value: 4800000 },
    { name: "6월", value: 3800000 },
    { name: "7월", value: 4300000 },
  ],
  orders: [
    { name: "월", value: 12 },
    { name: "화", value: 19 },
    { name: "수", value: 15 },
    { name: "목", value: 22 },
    { name: "금", value: 28 },
    { name: "토", value: 35 },
    { name: "일", value: 25 },
  ],
  categories: [
    { name: "전자기기", value: 4500000 },
    { name: "패션", value: 2800000 },
    { name: "생활용품", value: 1900000 },
    { name: "가전", value: 2100000 },
    { name: "스포츠", value: 1150000 },
  ],
};

export const menuItems = {
  discovery: {
    customer: [
      {
        id: "1",
        title: "상품 둘러보기",
        description: "다양한 상품을 탐색해보세요",
        icon: "shopping" as const,
        action: "상품 보여줘",
      },
      {
        id: "2",
        title: "주문 확인",
        description: "주문 현황과 배송 상태 확인",
        icon: "package" as const,
        action: "내 주문 보여줘",
      },
      {
        id: "3",
        title: "날씨 확인",
        description: "오늘의 날씨 정보",
        icon: "weather" as const,
        action: "서울 날씨 어때?",
      },
      {
        id: "4",
        title: "도움말",
        description: "사용 방법 안내",
        icon: "help" as const,
        action: "도움말",
      },
    ],
    admin: [
      {
        id: "1",
        title: "상품 관리",
        description: "상품 목록 조회 및 관리",
        icon: "package" as const,
        action: "상품 관리",
      },
      {
        id: "2",
        title: "주문 관리",
        description: "모든 주문 조회 및 상태 변경",
        icon: "shopping" as const,
        action: "주문 관리",
      },
      {
        id: "3",
        title: "사용자 관리",
        description: "회원 정보 조회 및 관리",
        icon: "users" as const,
        action: "사용자 관리",
      },
      {
        id: "4",
        title: "통계 보기",
        description: "매출, 주문, 회원 통계",
        icon: "chart" as const,
        action: "통계 보여줘",
      },
      {
        id: "5",
        title: "날씨 확인",
        description: "오늘의 날씨 정보",
        icon: "weather" as const,
        action: "날씨 알려줘",
      },
      {
        id: "6",
        title: "설정",
        description: "시스템 설정",
        icon: "settings" as const,
        action: "설정",
      },
    ],
  },
  help: [
    {
      id: "1",
      title: "상품 검색",
      description: '"상품 보여줘" 또는 "전자기기 상품"',
      icon: "shopping" as const,
    },
    {
      id: "2",
      title: "주문 확인",
      description: '"내 주문" 또는 "배송 현황"',
      icon: "package" as const,
    },
    {
      id: "3",
      title: "날씨 조회",
      description: '"서울 날씨" 또는 "오늘 날씨"',
      icon: "weather" as const,
    },
    {
      id: "4",
      title: "통계 보기",
      description: '"매출 통계" 또는 "차트 보여줘"',
      icon: "chart" as const,
    },
  ],
};
