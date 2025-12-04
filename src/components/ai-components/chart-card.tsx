import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type ChartType = "line" | "bar" | "pie";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface ChartCardProps {
  title: string;
  description?: string;
  data: DataPoint[];
  type?: ChartType;
  dataKey?: string;
  colors?: string[];
}

const defaultColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-cyan-500",
];

// Server-safe chart component using CSS instead of recharts
export function ChartCard({
  title,
  description,
  data,
  type = "bar",
  dataKey = "value",
  colors = defaultColors,
}: ChartCardProps) {
  const maxValue = Math.max(...data.map((d) => d[dataKey] as number));
  const total = data.reduce((sum, d) => sum + (d[dataKey] as number), 0);

  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => {
        const value = item[dataKey] as number;
        const percentage = (value / maxValue) * 100;
        return (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium">{value.toLocaleString()}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  colors[index % colors.length]
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPieChart = () => (
    <div className="space-y-4">
      {/* Simple legend-style display for pie data */}
      <div className="grid grid-cols-2 gap-3">
        {data.map((item, index) => {
          const value = item[dataKey] as number;
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  colors[index % colors.length]
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {value.toLocaleString()} ({percentage}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Visual bar representation */}
      <div className="h-6 rounded-full overflow-hidden flex">
        {data.map((item, index) => {
          const value = item[dataKey] as number;
          const percentage = (value / total) * 100;
          return (
            <div
              key={item.name}
              className={`h-full ${colors[index % colors.length]}`}
              style={{ width: `${percentage}%` }}
              title={`${item.name}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="space-y-3">
      {/* Simple table-style display for line/trend data */}
      <div className="grid grid-cols-1 gap-2">
        {data.map((item, index) => {
          const value = item[dataKey] as number;
          const percentage = (value / maxValue) * 100;
          const prevValue =
            index > 0 ? (data[index - 1][dataKey] as number) : value;
          const trend = value > prevValue ? "↑" : value < prevValue ? "↓" : "→";
          const trendColor =
            value > prevValue
              ? "text-green-500"
              : value < prevValue
              ? "text-red-500"
              : "text-muted-foreground";

          return (
            <div
              key={item.name}
              className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
            >
              <span className="text-sm text-muted-foreground w-16">
                {item.name}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="font-medium text-sm w-20 text-right">
                {value.toLocaleString()}
              </span>
              <span className={`text-sm ${trendColor}`}>{trend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderChart = () => {
    switch (type) {
      case "pie":
        return renderPieChart();
      case "line":
        return renderLineChart();
      case "bar":
      default:
        return renderBarChart();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
