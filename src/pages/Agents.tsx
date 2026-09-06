import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Send,
  Sparkles,
  Lightbulb,
  PenLine,
  Search,
  Send as Publish,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Activity,
  Clock,
  CheckCircle2,
  CircleDashed,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronRight,
  Settings2,
  Zap,
  Workflow as WorkflowIcon,
  Eye,
  Database,
  Bot
} from "lucide-react";
import { api } from "@/lib/api-client";
import { agents, initialChat } from "@/lib/data";
import type { Agent, ChatMessage, AgentStatus } from "@/lib/data";

const roleIcons: Record<string, React.ReactNode> = {
  orchestrator: <Brain className="w-5 h-5" />,
  ideator: <Lightbulb className="w-5 h-5" />,
  drafter: <PenLine className="w-5 h-5" />,
  reviewer: <Search className="w-5 h-5" />,
  publisher: <Publish className="w-5 h-5" />,
};

const roleGradients: Record<string, string> = {
  orchestrator: "from-violet-500 to-violet-600",
  ideator: "from-pink-500 to-purple-500",
  drafter: "from-cyan-500 to-blue-500",
  reviewer: "from-yellow-500 to-orange-500",
  publisher: "from-green-500 to-emerald-500",
};

const roleBorder: Record<string, string> = {
  orchestrator: "border-violet-500/40",
  ideator: "border-pink-500/40",
  drafter: "border-cyan-500/40",
  reviewer: "border-yellow-500/40",
  publisher: "border-green-500/40",
};

const roleText: Record<string, string> = {
  orchestrator: "text-violet-400",
  ideator: "text-pink-400",
  drafter: "text-cyan-400",
  reviewer: "text-yellow-400",
  publisher: "text-green-400",
};

const roleBg: Record<string, string> = {
  orchestrator: "bg-violet-500/10",
  ideator: "bg-pink-500/10",
  drafter: "bg-cyan-500/10",
  reviewer: "bg-yellow-500/10",
  publisher: "bg-green-500/10",
};

const statusColors: Record<AgentStatus, { dot: string; bg: string; text: string; label: string }> = {
  idle: { dot: "bg-muted-foreground/40", bg: "bg-muted", text: "text-muted-foreground", label: "Idle" },
  thinking: { dot: "bg-blue-500 animate-pulse", bg: "bg-blue-500/15", text: "text-blue-400", label: "Thinking" },
  working: { dot: "bg-yellow-500 animate-pulse", bg: "bg-yellow-500/15", text: "text-yellow-400", label: "Working" },
  complete: { dot: "bg-green-500", bg: "bg-green-500/15", text: "text-green-400", label: "Complete" },
  error: { dot: "bg-red-500", bg: "bg-red-500/15", text: "text-red-400", label: "Error" },
};

interface PipelineStep {
  id: string;
  agent: string;
  action: string;
  status: "pending" | "active" | "complete";
  output?: string;
}

export const Agents = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents[0]);
  const [agentList, setAgentList] = useState<Agent[]>(agents);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([
    { id: "p1", agent: "orchestrator", action: "Analyzing request", status: "complete", output: "Topic identified. Routing to specialists." },
    { id: "p2", agent: "ideator", action: "Generating ideas", status: "complete", output: "3 angles found. Best fit: Option #1" },
    { id: "p3", agent: "drafter", action: "Writing draft", status: "active", output: "Drafting in progress... 2,890 chars target" },
    { id: "p4", agent: "reviewer", action: "Quality check", status: "pending" },
    { id: "p5", agent: "publisher", action: "Schedule & publish", status: "pending" },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Animate pipeline progress
  useEffect(() => {
    if (pipelineRunning && pipelineStep < pipelineSteps.length) {
      const timer = setTimeout(() => {
        setPipelineSteps(prev => prev.map((step, i) => {
          if (i < pipelineStep) return { ...step, status: "complete" };
          if (i === pipelineStep) return { ...step, status: "active" };
          return step;
        }));
        setPipelineStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (pipelineRunning && pipelineStep >= pipelineSteps.length) {
      setPipelineSteps(prev => prev.map(s => ({ ...s, status: "complete" })));
      setTimeout(() => {
        setPipelineRunning(false);
        setPipelineStep(0);
      }, 1500);
    }
  }, [pipelineRunning, pipelineStep]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    const messages = await api.sendMessage(input);
    setChatMessages(messages);
    setInput("");
    setIsLoading(false);
  };

  const runPipeline = () => {
    setPipelineSteps(prev => prev.map(s => ({ ...s, status: "pending" })));
    setPipelineStep(0);
    setPipelineRunning(true);
  };

  const formatTime = () => new Date().toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Agent Studio</h1>
              <p className="text-sm text-muted-foreground">AutoGen-style multi-agent orchestration for content automation</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Settings2 className="w-3.5 h-3.5 mr-1.5" />
            Configure
          </Button>
          <Button
            className="btn-gradient text-white shadow-lg shadow-primary/20"
            size="sm"
            onClick={runPipeline}
            disabled={pipelineRunning}
          >
            {pipelineRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1.5" />
                Run Pipeline
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {agentList.map((agent) => {
          const sc = statusColors[agent.status];
          const isSelected = selectedAgent?.id === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`relative glass-card p-4 cursor-pointer transition-all duration-300 ${
                isSelected ? "border-primary/50 shadow-lg shadow-primary/10" : "border-border hover:border-primary/20"
              }`}
            >
              {/* Pulse for active */}
              {(agent.status === "working" || agent.status === "thinking") && (
                <div className="absolute inset-0 rounded-xl pointer-events-none">
                  <div className="absolute inset-0 rounded-xl animate-pulse opacity-30" style={{
                    background: `radial-gradient(circle at 50% 50%, ${roleText[agent.role].includes("violet") ? "hsl(262, 83%, 58%)" : "hsl(188, 94%, 50%)"} 0%, transparent 70%)`
                  }} />
                </div>
              )}
              
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleGradients[agent.role]} flex items-center justify-center text-white shadow-lg`}>
                    {roleIcons[agent.role]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    <span className={`text-[10px] font-medium ${sc.text}`}>{sc.label}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-0.5">{agent.name}</h3>
                <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground font-mono">{agent.model}</span>
                  <span className={sc.text}>{agent.avgResponseTime}s</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Visualization */}
      <Card className="glass-card border-border overflow-hidden">
        <CardHeader className="pb-3 border-b border-border bg-secondary/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <WorkflowIcon className="w-4 h-4 text-cyan-400" />
              Live Pipeline
              {pipelineRunning && (
                <Badge variant="outline" className="ml-2 text-[10px] border-green-500/30 text-green-400 gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Running
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">Run #4521</span>
              {pipelineRunning && (
                <RotateCcw className="w-3.5 h-3.5 text-muted-foreground animate-spin-slow" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {pipelineSteps.map((step, index) => {
              const isLast = index === pipelineSteps.length - 1;
              return (
                <div key={step.id} className="relative">
                  <div className={`p-4 rounded-xl border transition-all ${
                    step.status === "active" 
                      ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10" 
                      : step.status === "complete" 
                      ? "border-green-500/30 bg-green-500/5" 
                      : "border-border bg-secondary/20"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${roleGradients[step.agent]} flex items-center justify-center text-white text-xs`}>
                        {roleIcons[step.agent]}
                      </div>
                      {step.status === "active" && (
                        <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                      )}
                      {step.status === "complete" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      {step.status === "pending" && (
                        <CircleDashed className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs font-medium capitalize mb-1">{step.agent}</p>
                    <p className="text-[10px] text-muted-foreground mb-2">{step.action}</p>
                    {step.output && (
                      <p className="text-[10px] text-foreground/70 line-clamp-2 italic">{step.output}</p>
                    )}
                  </div>
                  {!isLast && (
                    <ArrowRight className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Interaction Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 glass-card border-border flex flex-col h-[600px]">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bot className="w-4 h-4 text-violet-400" />
                Agent Conversation
              </CardTitle>
              <Badge variant="outline" className="text-[10px] gap-1 border-green-500/30 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                All agents online
              </Badge>
            </div>
          </CardHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => {
              const agent = msg.agentId ? agentList.find(a => a.id === msg.agentId) : null;
              if (msg.role === "system") {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <span className="text-[10px] text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                      {msg.content}
                    </span>
                  </div>
                );
              }
              if (msg.role === "user") {
                return (
                  <div key={msg.id} className="flex justify-end animate-slide-in-right">
                    <div className="max-w-md">
                      <div className="chat-bubble user rounded-2xl rounded-tr-md">
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-right mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={msg.id} className="flex gap-3 animate-fade-in">
                  {agent && (
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleGradients[agent.role]} flex items-center justify-center text-white flex-shrink-0`}>
                      {roleIcons[agent.role]}
                    </div>
                  )}
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${roleText[agent?.role || ""]}`}>{agent?.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{msg.metadata?.model}</span>
                      {msg.metadata?.duration && (
                        <span className="text-[10px] text-muted-foreground">· {msg.metadata.duration}s</span>
                      )}
                    </div>
                    <div className="chat-bubble agent rounded-2xl rounded-tl-md">
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center text-white">
                  <Brain className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Agents are collaborating...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask agents to create content, analyze leads, or run a workflow..."
                className="flex-1 bg-secondary/50 border-border focus-visible:ring-primary/30"
                disabled={isLoading}
              />
              <Button type="submit" className="btn-gradient text-white" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {["Generate post about AI agents", "Analyze last 5 posts", "Schedule for tomorrow", "Find trending topics"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-[10px] px-2 py-1 rounded-full bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Agent Details Panel */}
        <div className="space-y-4">
          {selectedAgent && (
            <Card className={`glass-card ${roleBorder[selectedAgent.role]} border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roleGradients[selectedAgent.role]} flex items-center justify-center text-white shadow-lg`}>
                    {roleIcons[selectedAgent.role]}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold">{selectedAgent.name}</CardTitle>
                    <p className="text-xs text-muted-foreground capitalize">{selectedAgent.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-[10px] text-muted-foreground">Tasks</p>
                    <p className="text-lg font-bold gradient-text">{selectedAgent.tasksCompleted.toLocaleString()}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-[10px] text-muted-foreground">Success</p>
                    <p className="text-lg font-bold text-green-400">{selectedAgent.successRate}%</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-[10px] text-muted-foreground">Latency</p>
                    <p className="text-lg font-bold text-cyan-400">{selectedAgent.avgResponseTime}s</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium mb-2 text-muted-foreground">Model</p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border">
                    <Cpu className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-sm font-mono">{selectedAgent.model}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium mb-2 text-muted-foreground">Capabilities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.capabilities.map((cap) => (
                      <Badge key={cap} variant="outline" className="text-[10px] border-border bg-secondary/30">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedAgent.currentTask && (
                  <div className={`p-3 rounded-lg border ${statusColors[selectedAgent.status].bg} ${statusColors[selectedAgent.status].text}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-3 h-3" />
                      <span className="text-[10px] font-medium uppercase">Current Task</span>
                    </div>
                    <p className="text-xs">{selectedAgent.currentTask}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="glass-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Memory & Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Shared Context", value: 4.2, max: 10, unit: "MB" },
                { label: "Vector Memory", value: 1247, max: 5000, unit: "items" },
                { label: "Conversation History", value: 87, max: 100, unit: "turns" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="font-medium">{stat.value.toLocaleString()}{stat.max ? ` / ${stat.max.toLocaleString()}` : ""} {stat.unit}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
