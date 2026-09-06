import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Webhook,
  Copy,
  CheckCheck,
  Plus,
  Search,
  Server,
  Activity,
  Zap,
  Database,
  Shield,
  Key,
  Code2,
  ChevronRight,
  Globe,
  Clock,
  Hash
} from "lucide-react";

const webhooks = [
  { id: "w1", name: "Post Published", url: "/api/webhooks/linkedin/post-published", events: 1247, status: "active", lastTrigger: "2m ago" },
  { id: "w2", name: "Lead Captured", url: "/api/webhooks/leads/captured", events: 892, status: "active", lastTrigger: "5m ago" },
  { id: "w3", name: "Comment Received", url: "/api/webhooks/linkedin/comment", events: 3421, status: "active", lastTrigger: "1m ago" },
  { id: "w4", name: "Workflow Completed", url: "/api/webhooks/workflows/completed", events: 547, status: "active", lastTrigger: "12m ago" },
  { id: "w5", name: "Agent Error", url: "/api/webhooks/agents/error", events: 12, status: "active", lastTrigger: "2h ago" },
];

const endpoints = [
  { method: "POST", path: "/api/content/generate", desc: "Generate AI content", category: "Content" },
  { method: "POST", path: "/api/content/:id/publish", desc: "Publish post to LinkedIn", category: "Content" },
  { method: "GET", path: "/api/content", desc: "List all content", category: "Content" },
  { method: "POST", path: "/api/agents/chat", desc: "Multi-agent chat", category: "Agents" },
  { method: "GET", path: "/api/agents", desc: "List all agents", category: "Agents" },
  { method: "POST", path: "/api/workflows/run/:id", desc: "Trigger workflow", category: "Workflows" },
  { method: "GET", path: "/api/leads", desc: "List leads", category: "Leads" },
  { method: "POST", path: "/api/leads/score", desc: "Score lead", category: "Leads" },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500/15 text-green-400 border-green-500/30",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  PUT: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
};

export const ApiHub = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEndpoints = endpoints.filter(e => 
    e.path.toLowerCase().includes(search.toLowerCase()) ||
    e.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <Webhook className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">API Hub</h1>
              <p className="text-sm text-muted-foreground">Microservice endpoints, webhooks, and integration management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Key className="w-3.5 h-3.5 mr-1.5" />
            API Keys
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Webhook
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "API Calls (24h)", value: "12,453", icon: Activity, color: "violet" },
          { label: "Active Webhooks", value: 5, icon: Webhook, color: "cyan" },
          { label: "Uptime", value: "99.9%", icon: Server, color: "green" },
          { label: "Avg Latency", value: "84ms", icon: Zap, color: "yellow" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 border border-border card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${
                stat.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                stat.color === "green" ? "bg-green-500/10 text-green-400" :
                "bg-yellow-500/10 text-yellow-400"
              } flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Webhooks */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Webhook className="w-4 h-4 text-cyan-400" />
              Webhooks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <h4 className="text-sm font-semibold">{webhook.name}</h4>
                    <code className="text-[10px] text-muted-foreground font-mono">{webhook.url}</code>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                    {webhook.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Hash className="w-2.5 h-2.5" />
                    {webhook.events.toLocaleString()} events
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {webhook.lastTrigger}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-violet-400" />
                API Endpoints
              </CardTitle>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 h-7 text-xs bg-secondary/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {filteredEndpoints.map((endpoint, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors group"
              >
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <code className="text-xs font-mono flex-1 truncate">{endpoint.path}</code>
                <span className="text-xs text-muted-foreground hidden sm:block">{endpoint.desc}</span>
                <button
                  onClick={() => handleCopy(endpoint.path, `ep-${i}`)}
                  className="p-1.5 rounded hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedId === `ep-${i}` ? (
                    <CheckCheck className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Service Architecture */}
      <Card className="glass-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Server className="w-4 h-4 text-violet-400" />
            Service Architecture
          </CardTitle>
          <p className="text-xs text-muted-foreground">AutoGen-style microservice topology</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { name: "API Gateway", service: "nginx + Nitro", status: "healthy", color: "violet" },
              { name: "Orchestrator", service: "Python · AutoGen", status: "healthy", color: "cyan" },
              { name: "Content Service", service: "Node.js · TypeScript", status: "healthy", color: "green" },
              { name: "LinkedIn Client", service: "Python · Selenium", status: "healthy", color: "yellow" },
              { name: "LLM Service", service: "OpenAI + Anthropic", status: "healthy", color: "violet" },
              { name: "Vector DB", service: "Pinecone · pgvector", status: "healthy", color: "cyan" },
              { name: "Workflow Engine", service: "n8n · Temporal", status: "healthy", color: "green" },
              { name: "Queue Service", service: "Redis · BullMQ", status: "healthy", color: "yellow" },
            ].map((service) => (
              <div key={service.name} className="p-3 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold">{service.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-400">{service.status}</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">{service.service}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
