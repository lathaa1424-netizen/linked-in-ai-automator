import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Brain
} from "lucide-react";
import { engagementData, agentPerformanceData } from "@/lib/data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const radarData = [
  { metric: "Reach", value: 85 },
  { metric: "Engagement", value: 92 },
  { metric: "Conversion", value: 78 },
  { metric: "Quality", value: 94 },
  { metric: "Consistency", value: 88 },
  { metric: "Growth", value: 76 },
];

export const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Analytics</h1>
              <p className="text-sm text-muted-foreground">Deep insights into your LinkedIn performance and AI pipeline</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Last 7 days
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Impressions", value: "247K", delta: 18.5, icon: Eye, color: "violet" },
          { label: "Engagements", value: "12.4K", delta: 24.3, icon: Heart, color: "cyan" },
          { label: "Comments", value: "1,847", delta: 12.7, icon: MessageSquare, color: "green" },
          { label: "Shares", value: "892", delta: -2.1, icon: Share2, color: "pink" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 border border-border card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${
                stat.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                stat.color === "green" ? "bg-green-500/10 text-green-400" :
                "bg-pink-500/10 text-pink-400"
              } flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className={`flex items-center text-xs font-medium ${stat.delta > 0 ? "text-green-400" : "text-red-400"}`}>
                {stat.delta > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(stat.delta)}%
              </span>
            </div>
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Engagement Trend */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Engagement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="engagement" stroke="hsl(262, 83%, 65%)" strokeWidth={2} dot={{ fill: "hsl(262, 83%, 65%)" }} />
                <Line type="monotone" dataKey="clicks" stroke="hsl(188, 94%, 50%)" strokeWidth={2} dot={{ fill: "hsl(188, 94%, 50%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Brain className="w-4 h-4 text-violet-400" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border) / 0.5)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                <Radar dataKey="value" stroke="hsl(262, 83%, 65%)" fill="hsl(262, 83%, 65%)" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance */}
      <Card className="glass-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            Agent Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={agentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
              <XAxis dataKey="agent" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="tasks" fill="hsl(262, 83%, 65%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Insights
            <Badge variant="outline" className="ml-2 text-[10px] border-primary/30 text-primary">Beta</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              title: "Best posting time discovered",
              description: "Your audience is 42% more active on Tuesdays at 9:00 AM. Consider adjusting your schedule.",
              color: "violet",
            },
            {
              title: "Topic opportunity",
              description: "Posts about 'AI Ethics' have 67% higher engagement but you only published 2 this month.",
              color: "cyan",
            },
            {
              title: "Workflow optimization",
              description: "Adding a 24h delay between review and publish could improve quality scores by 8%.",
              color: "green",
            },
          ].map((insight, i) => (
            <div key={i} className={`p-3 rounded-lg border ${
              insight.color === "violet" ? "border-violet-500/20 bg-violet-500/5" :
              insight.color === "cyan" ? "border-cyan-500/20 bg-cyan-500/5" :
              "border-green-500/20 bg-green-500/5"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  insight.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                  insight.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                  "bg-green-500/10 text-green-400"
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
