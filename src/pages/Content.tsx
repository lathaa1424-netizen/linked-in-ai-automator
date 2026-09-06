import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Plus,
  Send,
  Edit3,
  RefreshCw,
  Trash2,
  MoreHorizontal,
  SendHorizontal,
  Clock3,
  Lightbulb,
  AlertCircle,
  CheckCheck,
  FileWarning,
  Loader2
} from "lucide-react";
import { posts, contentTypeData, engagementData } from "@/lib/data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type TabValue = "all" | "ideas" | "drafts" | "review" | "scheduled" | "published";

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  idea: { label: "Idea", icon: <Lightbulb className="w-3 h-3" />, color: "text-purple-400", bg: "bg-purple-400/10" },
  drafting: { label: "Drafting", icon: <Edit3 className="w-3 h-3" />, color: "text-blue-400", bg: "bg-blue-400/10" },
  review: { label: "In Review", icon: <AlertCircle className="w-3 h-3" />, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  scheduled: { label: "Scheduled", icon: <Calendar className="w-3 h-3" />, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  published: { label: "Published", icon: <CheckCircle2 className="w-3 h-3" />, color: "text-green-400", bg: "bg-green-400/10" },
  rejected: { label: "Rejected", icon: <XCircle className="w-3 h-3" />, color: "text-red-400", bg: "bg-red-400/10" },
};

export default function Content() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [selectedPost, setSelectedPost] = useState(posts[0]);

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(p => {
        if (activeTab === "ideas") return p.status === "idea";
        if (activeTab === "drafts") return p.status === "drafting";
        if (activeTab === "review") return p.status === "review";
        if (activeTab === "scheduled") return p.status === "scheduled";
        if (activeTab === "published") return p.status === "published";
        return true;
      });

  const counts = {
    all: posts.length,
    ideas: posts.filter(p => p.status === "idea").length,
    drafts: posts.filter(p => p.status === "drafting").length,
    review: posts.filter(p => p.status === "review").length,
    scheduled: posts.filter(p => p.status === "scheduled").length,
    published: posts.filter(p => p.status === "published").length,
  };

  const avgEngagement = posts.filter(p => p.engagement).reduce((acc, p) => ({
    views: acc.views + (p.engagement?.views || 0),
    likes: acc.likes + (p.engagement?.likes || 0),
    comments: acc.comments + (p.engagement?.comments || 0),
    shares: acc.shares + (p.engagement?.shares || 0),
  }), { views: 0, likes: 0, comments: 0, shares: 0 });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Content Studio</h1>
              <p className="text-sm text-muted-foreground">AI-powered content creation, scheduling, and analytics</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Generate Content
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Posts", value: "18", delta: 12.5, icon: FileText, color: "violet" },
          { label: "Avg Engagement", value: `${Math.round((avgEngagement.likes / posts.filter(p => p.engagement).length) * 10) / 10}%`, delta: 8.3, icon: TrendingUp, color: "cyan" },
          { label: "Pending Review", value: counts.review, delta: -2, icon: AlertCircle, color: "yellow" },
          { label: "Scheduled", value: counts.scheduled, delta: 0, icon: Calendar, color: "green" },
        ].map((stat) => (
          <div key={stat.label} className={`glass-card p-4 border border-${stat.color}-500/20 card-hover`}>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center ${
                stat.color === "violet" ? "text-violet-400" :
                stat.color === "cyan" ? "text-cyan-400" :
                stat.color === "yellow" ? "text-yellow-400" :
                "text-green-400"
              }`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-medium ${stat.delta > 0 ? "text-green-400" : stat.delta < 0 ? "text-red-400" : "text-muted-foreground"}`}>
                {stat.delta > 0 ? <ArrowUpRight className="w-3 h-3 inline" /> : stat.delta < 0 ? <ArrowDownRight className="w-3 h-3 inline" /> : null}
                {stat.delta > 0 ? `+${stat.delta}%` : stat.delta < 0 ? `${stat.delta}%` : "—"}
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Posts List */}
        <Card className="xl:col-span-2 glass-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Content Library</CardTitle>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
                <TabsList className="h-8 bg-secondary/50">
                  {(["all", "ideas", "drafts", "review", "scheduled", "published"] as TabValue[]).map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="h-7 px-2.5 text-[11px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {counts[tab] > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-bold">
                          {counts[tab]}
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredPosts.map((post) => {
              const sc = statusConfig[post.status];
              const isSelected = selectedPost?.id === post.id;
              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primary/50 bg-primary/5" 
                      : "border-border bg-secondary/20 hover:bg-secondary/40 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold truncate">{post.title}</h3>
                        {post.score && (
                          <span className="badge-glow">
                            <Star className="w-2.5 h-2.5" />
                            {post.score}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`flex items-center gap-1 ${sc.color}`}>
                          {sc.icon}
                          {sc.label}
                        </span>
                        <span>·</span>
                        <span>{post.topic}</span>
                        <span>·</span>
                        <span>{post.createdAt.split("T")[0]}</span>
                      </div>
                      {post.engagement && (
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            {(post.engagement.views / 1000).toFixed(1)}K
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart className="w-3 h-3" />
                            {post.engagement.likes}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageSquare className="w-3 h-3" />
                            {post.engagement.comments}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Share2 className="w-3 h-3" />
                            {post.engagement.shares}
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="p-1 rounded hover:bg-secondary/50 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No posts in this category</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Post Detail */}
        <div className="space-y-4">
          {selectedPost && (
            <Card className="glass-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Post Preview</CardTitle>
                  <Badge variant="outline" className={`${statusConfig[selectedPost.status].color} ${statusConfig[selectedPost.status].bg} border-0`}>
                    {statusConfig[selectedPost.status].icon}
                    <span className="ml-1">{statusConfig[selectedPost.status].label}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full ai-gradient flex items-center justify-center text-white text-xs font-bold">
                      {selectedPost.author.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{selectedPost.author.name}</p>
                      <p className="text-[10px] text-muted-foreground">{selectedPost.publishedAt || selectedPost.scheduledFor || selectedPost.createdAt}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{selectedPost.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedPost.content.length > 400 
                      ? selectedPost.content.slice(0, 400) + "..."
                      : selectedPost.content}
                  </p>
                </div>
                
                {selectedPost.score && (
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Quality Score</span>
                      <span className="text-lg font-bold gradient-text">{selectedPost.score}/100</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${selectedPost.score}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.hashtags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] border-border bg-secondary/30 text-muted-foreground">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {selectedPost.reviewNotes && (
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="text-xs font-medium text-yellow-400">Review Note</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedPost.reviewNotes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {selectedPost.status === "idea" && (
                    <Button className="btn-gradient text-white flex-1" size="sm">
                      <Sparkles className="w-3 h-3 mr-1.5" />
                      Draft with AI
                    </Button>
                  )}
                  {selectedPost.status === "drafting" && (
                    <Button className="btn-gradient text-white flex-1" size="sm">
                      <Send className="w-3 h-3 mr-1.5" />
                      Submit for Review
                    </Button>
                  )}
                  {selectedPost.status === "review" && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10">
                        <CheckCheck className="w-3 h-3 mr-1.5" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <XCircle className="w-3 h-3 mr-1.5" />
                        Reject
                      </Button>
                    </>
                  )}
                  {selectedPost.status === "scheduled" && (
                    <Button className="btn-gradient text-white flex-1" size="sm">
                      <SendHorizontal className="w-3 h-3 mr-1.5" />
                      Publish Now
                    </Button>
                  )}
                  {selectedPost.status === "published" && (
                    <Button variant="outline" className="flex-1" size="sm">
                      <BarChart3 className="w-3 h-3 mr-1.5" />
                      View Analytics
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Engagement Analytics */}
          <Card className="glass-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="eng2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(262, 83%, 65%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(262, 83%, 65%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="engagement" stroke="hsl(262, 83%, 65%)" fill="url(#eng2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center p-2 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-lg font-bold gradient-text">{avgEngagement.views.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Views</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-lg font-bold text-green-400">{avgEngagement.likes}</p>
                  <p className="text-[10px] text-muted-foreground">Likes</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-lg font-bold text-cyan-400">{avgEngagement.shares}</p>
                  <p className="text-[10px] text-muted-foreground">Shares</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
