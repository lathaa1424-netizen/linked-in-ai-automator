import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Eye,
  Heart,
  Share2,
  Send,
  BarChart3,
  Star,
  Timer,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { api } from "@/lib/api-client";
import { metrics, activities, engagementData, contentTypeData, agentPerformanceData } from "@/lib/data";

const metricIcons: Record<string, React.ReactNode> = {
  "📤": <Send className="w-5 h-5" />,
  "💬": <MessageSquare className="w-5 h-5" />,
  "👥": <Users className="w-5 h-5" />,
  "🤖": <Brain className="w-5 h-5" />,
  "⭐": <Star className="w-5 h-5" />,
  "⏱️": <Timer className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
  violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
  green: "from-green-500/20 to-green-500/5 border-green-500/30",
  purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
  pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30",
};

const iconColorMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  green: "text-green-400",
  purple: "text-purple-400",
  yellow: "text-yellow-400",
  pink: "text-pink-400",
};

const activityIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  post_published: { icon: <Send className="w-3.5 h-3.5" />, color: "text-green-400 bg-green-400/10" },
  lead_engaged: { icon: <Users className="w-3.5 h-3.5" />, color: "text-blue-400 bg-blue-400/10" },
  agent_action: { icon: <Brain className="w-3.5 h-3.5" />, color: "text-violet-400 bg-violet-400/10" },
  workflow_completed: { icon: <Zap className="w-3.5 h-3.5" />, color: "text-yellow-400 bg-yellow-400/10" },
  review_submitted: { icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-cyan-400 bg-cyan-400/10" },
  connection_made: { icon: <Users className="w-3.5 h-3.5" />, color: "text-purple-400 bg-purple-400/10" },
};

export const Dashboard = () => {
  const [recentActivities] = useState(activities.slice(0, 6));
  const [liveActivities, setLiveActivities] = useState(activities.slice(0, 5));

  // Simulate live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: `live-${Date.now()}`,
        type: ["agent_action", "lead_engaged", "workflow_completed"][Math.floor(Math.random() * 3)] as any,
        message: [
          "Ideator generated new topic ideas",
          "New profile view from Sarah Johnson",
          "Workflow completed successfully",
          "Reviewer scored post: 93/100",
          "Publisher sent scheduled post",
        ][Math.floor(Math.random() * 5)],
        agent: ["Ideator Agent", "Reviewer Agent", "Publisher Agent", undefined][Math.floor(Math.random() * 4)],
        timestamp: "just now",
      };
      setLiveActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Automation Dashboard</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground ml-1">Real-time overview of your AI-powered LinkedIn automation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border hover:bg-secondary/50">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 stagger-children">
        {metrics.map((metric) => (
          <div key={metric.label} className={`glass-card p-4 border ${colorMap[metric.color]} card-hover`}>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center ${iconColorMap[metric.color]}`}>
                {metricIcons[metric.icon]}
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${
                metric.trend === "up" ? "text-green-400" : metric.trend === "down" ? "text-red-400" : "text-muted-foreground"
              }`}>
                {metric.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
                {metric.trend === "down" && <ArrowDownRight className="w-3 h-3" />}
                {metric.delta > 0 && `${metric.delta}%`}
                {metric.delta < 0 && `${metric.delta}%`}
                {metric.delta === 0 && "—"}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <Card className="xl:col-span-2 glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Engagement Overview
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">Engagement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-muted-foreground">Reach</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="engGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262, 83%, 65%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262, 83%, 65%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(188, 94%, 50%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(188, 94%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="engagement" stroke="hsl(262, 83%, 65%)" fill="url(#engGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="reach" stroke="hsl(188, 94%, 50%)" fill="url(#reachGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Brain className="w-4 h-4 text-violet-400" />
              Agent Pipeline
              <Badge variant="outline" className="ml-auto text-[10px] gap-1 border-green-500/30 text-green-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Orchestrator", emoji: "🧠", status: "Working", color: "violet", task: "Coordinating pipeline #4521" },
              { name: "Ideator", emoji: "💡", status: "Complete", color: "cyan", task: "Topic analysis done" },
              { name: "Drafter", emoji: "✍️", status: "Working", color: "blue", task: "Drafting post on AI trends" },
              { name: "Reviewer", emoji: "🔍", status: "Thinking", color: "yellow", task: "Reviewing draft #4521" },
              { name: "Publisher", emoji: "📤", status: "Idle", color: "green", task: "Awaiting approved content" },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/30 border border-border hover:border-primary/20 transition-colors">
                <div className="text-xl">{agent.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{agent.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      agent.status === "Working" ? "bg-yellow-500/15 text-yellow-400" :
                      agent.status === "Complete" ? "bg-green-500/15 text-green-400" :
                      agent.status === "Thinking" ? "bg-blue-500/15 text-blue-400" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{agent.task}</p>
                </div>
              </div>
            ))}
            <Link to="/agents" className="block mt-2">
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground h-8">
                Open Agent Studio
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {liveActivities.map((activity, i) => {
              const actInfo = activityIcons[activity.type] || { icon: <Activity className="w-3.5 h-3.5" />, color: "text-muted-foreground bg-muted" };
              return (
                <div key={activity.id} className="flex items-start gap-3 animate-slide-in-right" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${actInfo.color}`}>
                    {actInfo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{activity.timestamp}</span>
                      {activity.agent && (
                        <span className="text-[10px] text-muted-foreground/60">{activity.agent}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Content Distribution */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              Content Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--card))" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-1.5 mt-2">
              {contentTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Generate New Post", icon: Sparkles, color: "violet", desc: "AI-powered content creation" },
              { label: "View Workflows", icon: Zap, color: "cyan", desc: "Manage automation pipelines" },
              { label: "Analyze Leads", icon: Users, color: "green", desc: "AI-powered lead scoring" },
              { label: "Schedule Post", icon: Clock, color: "yellow", desc: "Plan your content calendar" },
            ].map((action) => (
              <Link key={action.label} to={
                action.label.includes("Post") ? "/content" :
                action.label.includes("Workflow") ? "/workflows" :
                action.label.includes("Lead") ? "/leads" : "/content"
              }>
                <div className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer">
                  <div className={`w-9 h-9 rounded-lg bg-${action.color}-500/10 flex items-center justify-center ${
                    action.color === "violet" ? "text-violet-400 bg-violet-500/10" :
                    action.color === "cyan" ? "text-cyan-400 bg-cyan-500/10" :
                    action.color === "green" ? "text-green-400 bg-green-500/10" :
                    "text-yellow-400 bg-yellow-500/10"
                  }`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</p>
                    <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
