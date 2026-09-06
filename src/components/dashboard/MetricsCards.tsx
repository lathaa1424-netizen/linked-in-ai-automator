import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";

export const MetricsCards = () => {
  const metrics = [
    { label: "Total Leads", value: "1,247", change: "+12%", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Messages Sent", value: "892", change: "+24%", icon: MessageSquare, color: "bg-green-50 text-green-600" },
    { label: "Acceptance Rate", value: "68%", change: "+8%", icon: CheckCircle, color: "bg-purple-50 text-purple-600" },
    { label: "Response Rate", value: "34%", change: "+15%", icon: TrendingUp, color: "bg-orange-50 text-orange-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-1">{metric.change} this week</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};