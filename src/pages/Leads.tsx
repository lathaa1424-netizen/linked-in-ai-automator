import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Filter,
  Plus,
  Star,
  TrendingUp,
  Target,
  Mail,
  Eye,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Building,
  Briefcase
} from "lucide-react";
import { leads } from "@/lib/data";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-blue-400", bg: "bg-blue-500/15" },
  qualified: { label: "Qualified", color: "text-violet-400", bg: "bg-violet-500/15" },
  engaged: { label: "Engaged", color: "text-cyan-400", bg: "bg-cyan-500/15" },
  connected: { label: "Connected", color: "text-green-400", bg: "bg-green-500/15" },
  lost: { label: "Lost", color: "text-red-400", bg: "bg-red-500/15" },
};

export const Leads = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified" || l.status === "engaged").length;
  const avgScore = Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Leads</h1>
              <p className="text-sm text-muted-foreground">AI-scored leads with personalized outreach suggestions</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Filter
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Leads", value: totalLeads, delta: 12, icon: Users, color: "violet" },
          { label: "Qualified", value: qualifiedLeads, delta: 8, icon: UserCheck, color: "green" },
          { label: "Avg Score", value: avgScore, delta: 5, icon: Target, color: "cyan" },
          { label: "Conversion", value: "24%", delta: 2, icon: TrendingUp, color: "yellow" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 border border-border card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${
                stat.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                stat.color === "green" ? "bg-green-500/10 text-green-400" :
                stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                "bg-yellow-500/10 text-yellow-400"
              } flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-400">
                <ArrowUpRight className="w-3 h-3" />
                {stat.delta}%
              </span>
            </div>
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, company, or title..."
            className="pl-10 bg-secondary/50 border-border"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["all", "new", "qualified", "engaged", "connected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredLeads.map((lead) => {
          const sc = statusConfig[lead.status];
          const scoreColor = lead.score >= 80 ? "text-green-400" : lead.score >= 60 ? "text-yellow-400" : "text-orange-400";
          return (
            <Card key={lead.id} className="glass-card border-border card-hover">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-full ai-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {lead.avatar}
                    {lead.score >= 80 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold">{lead.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Briefcase className="w-3 h-3" />
                          <span className="truncate">{lead.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Building className="w-3 h-3" />
                          <span className="truncate">{lead.company}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${scoreColor}`}>{lead.score}</div>
                        <div className="text-[10px] text-muted-foreground">Score</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${sc.bg} ${sc.color} font-medium`}>
                        {sc.label}
                      </span>
                      {lead.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>Last activity: {lead.lastActivity}</span>
                        <span>·</span>
                        <span>{lead.source}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-secondary/50 transition-colors">
                          <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-secondary/50 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-secondary/50 transition-colors">
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
