import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Play,
  Pause,
  Plus,
  Settings,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Activity,
  ArrowRight,
  GitBranch,
  Timer,
  Webhook,
  Bot,
  Brain,
  Sparkles,
  ArrowDownRight,
  ChevronRight,
  Database,
  Mail,
  ExternalLink
} from "lucide-react";
import { workflows } from "@/lib/data";
import type { Workflow, WorkflowStep, WorkflowStatus } from "@/lib/data";

const statusConfig: Record<WorkflowStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "text-green-400", bg: "bg-green-500/15" },
  paused: { label: "Paused", color: "text-yellow-400", bg: "bg-yellow-500/15" },
  draft: { label: "Draft", color: "text-muted-foreground", bg: "bg-muted" },
  error: { label: "Error", color: "text-red-400", bg: "bg-red-500/15" },
};

const categoryConfig: Record<string, string> = {
  content: "text-violet-400 bg-violet-500/10",
  leads: "text-blue-400 bg-blue-500/10",
  engagement: "text-green-400 bg-green-500/10",
  analytics: "text-cyan-400 bg-cyan-500/10",
};

const stepIcons: Record<string, React.ReactNode> = {
  trigger: <Timer className="w-4 h-4" />,
  agent: <Bot className="w-4 h-4" />,
  condition: <GitBranch className="w-4 h-4" />,
  action: <Zap className="w-4 h-4" />,
  ai: <Brain className="w-4 h-4" />,
  delay: <Clock className="w-4 h-4" />,
  linkedin: <Webhook className="w-4 h-4" />,
};

const stepColors: Record<string, string> = {
  trigger: "border-orange-500/40 bg-orange-500/10",
  agent: "border-violet-500/40 bg-violet-500/10",
  condition: "border-yellow-500/40 bg-yellow-500/10",
  action: "border-cyan-500/40 bg-cyan-500/10",
  ai: "border-pink-500/40 bg-pink-500/10",
  delay: "border-blue-500/40 bg-blue-500/10",
  linkedin: "border-blue-600/40 bg-blue-600/10",
};

const stepTextColors: Record<string, string> = {
  trigger: "text-orange-400",
  agent: "text-violet-400",
  condition: "text-yellow-400",
  action: "text-cyan-400",
  ai: "text-pink-400",
  delay: "text-blue-400",
  linkedin: "text-blue-500",
};

export default function Workflows() {
  const [workflowList, setWorkflowList] = useState(workflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [runningWorkflow, setRunningWorkflow] = useState<string | null>(null);

  const toggleWorkflow = (id: string) => {
    setWorkflowList(prev => prev.map(w => 
      w.id === id ? { ...w, status: w.status === "active" ? "paused" : "active" } : w
    ));
  };

  const runWorkflow = async (id: string) => {
    setRunningWorkflow(id);
    await new Promise(r => setTimeout(r, 2000));
    setRunningWorkflow(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Workflows</h1>
              <p className="text-sm text-muted-foreground">n8n-style visual workflow builder and automation management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Import
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Workflows", value: 3, icon: Zap, color: "green" },
          { label: "Total Runs", value: "2,605", icon: Play, color: "violet" },
          { label: "Success Rate", value: "96.8%", icon: CheckCircle2, color: "cyan" },
          { label: "Avg Runtime", value: "4.2s", icon: Timer, color: "yellow" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 border border-border card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${
                stat.color === "green" ? "bg-green-500/10 text-green-400" :
                stat.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
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

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Workflow List */}
        <Card className="xl:col-span-1 glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">All Workflows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {workflowList.map((workflow) => {
              const sc = statusConfig[workflow.status];
              const isSelected = selectedWorkflow?.id === workflow.id;
              return (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{workflow.name}</h3>
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-2">{workflow.description}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWorkflow(workflow.id); }}
                      className="p-1 rounded hover:bg-secondary/50 transition-colors"
                    >
                      {workflow.status === "active" ? (
                        <Pause className="w-4 h-4 text-green-400" />
                      ) : (
                        <Play className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${sc.bg} ${sc.color} font-medium`}>
                        {sc.label}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${categoryConfig[workflow.category]}`}>
                        {workflow.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{workflow.runs} runs</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex-1 progress-bar">
                      <div className="progress-fill" style={{ width: `${workflow.successRate}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{workflow.successRate}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Workflow Canvas */}
        <Card className="xl:col-span-2 glass-card border-border overflow-hidden">
          <CardHeader className="pb-3 border-b border-border bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  {selectedWorkflow?.name}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusConfig[selectedWorkflow?.status || "draft"].bg} ${statusConfig[selectedWorkflow?.status || "draft"].color} font-medium`}>
                    {statusConfig[selectedWorkflow?.status || "draft"].label}
                  </span>
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedWorkflow?.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-border">
                  <Settings className="w-3.5 h-3.5" />
                </Button>
                <Button
                  className="btn-gradient text-white"
                  size="sm"
                  onClick={() => selectedWorkflow && runWorkflow(selectedWorkflow.id)}
                  disabled={runningWorkflow === selectedWorkflow?.id}
                >
                  {runningWorkflow === selectedWorkflow?.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1.5" />
                      Run Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Workflow Info */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-[10px] text-muted-foreground">Trigger</p>
                <p className="text-sm font-medium">{selectedWorkflow?.trigger}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-[10px] text-muted-foreground">Last Run</p>
                <p className="text-sm font-medium font-mono">{selectedWorkflow?.lastRun?.split("T")[0] || "Never"}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-[10px] text-muted-foreground">Success Rate</p>
                <p className="text-sm font-bold text-green-400">{selectedWorkflow?.successRate}%</p>
              </div>
            </div>

            {/* Visual Workflow Graph */}
            <div className="relative">
              <div className="flex items-center gap-3 overflow-x-auto pb-4">
                {selectedWorkflow?.steps.map((step, index) => {
                  const isLast = index === selectedWorkflow.steps.length - 1;
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-28 p-3 rounded-xl border ${stepColors[step.type]} transition-all flex flex-col items-center text-center`}>
                        <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mb-2 ${stepTextColors[step.type]}`}>
                          {stepIcons[step.type]}
                        </div>
                        <p className="text-[10px] font-semibold leading-tight mb-0.5">{step.label}</p>
                        <p className="text-[9px] text-muted-foreground leading-tight">{step.description}</p>
                      </div>
                      {!isLast && (
                        <div className="flex-shrink-0 mx-1">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Connection Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(262, 83%, 65%)" />
                    <stop offset="100%" stopColor="hsl(188, 94%, 50%)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Run Log */}
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Recent Runs
              </h4>
              <div className="space-y-2">
                {[
                  { time: "10:42 AM", status: "success", duration: "3.2s", message: "Pipeline completed successfully" },
                  { time: "09:00 AM", status: "success", duration: "4.1s", message: "Pipeline completed successfully" },
                  { time: "Yesterday", status: "success", duration: "3.8s", message: "Pipeline completed successfully" },
                ].map((run, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/20 border border-border">
                    {run.status === "success" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-medium">{run.message}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                      <span>{run.time}</span>
                      <span>·</span>
                      <span>{run.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
