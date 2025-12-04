import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning } from "lucide-react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  humidity: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";
  description?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: Snowflake,
  stormy: CloudLightning,
};

const weatherColors = {
  sunny: "text-yellow-500",
  cloudy: "text-gray-400",
  rainy: "text-blue-400",
  snowy: "text-cyan-300",
  stormy: "text-purple-500",
};

const weatherBg = {
  sunny: "from-yellow-500/10 to-orange-500/10",
  cloudy: "from-gray-500/10 to-slate-500/10",
  rainy: "from-blue-500/10 to-cyan-500/10",
  snowy: "from-cyan-500/10 to-blue-500/10",
  stormy: "from-purple-500/10 to-indigo-500/10",
};

export function WeatherCard({
  city,
  temperature,
  humidity,
  condition,
  description,
}: WeatherCardProps) {
  const Icon = weatherIcons[condition];

  return (
    <Card
      className={`w-full max-w-sm bg-gradient-to-br ${weatherBg[condition]} border-none shadow-lg`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {city}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold">{temperature}°</div>
            <div className="text-sm text-muted-foreground mt-1">
              습도 {humidity}%
            </div>
            {description && (
              <div className="text-sm mt-2 text-foreground/80">
                {description}
              </div>
            )}
          </div>
          <Icon className={`w-20 h-20 ${weatherColors[condition]}`} />
        </div>
      </CardContent>
    </Card>
  );
}
