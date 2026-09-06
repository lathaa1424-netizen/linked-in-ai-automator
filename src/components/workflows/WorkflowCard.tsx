import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Play, Pause, Edit, Trash2 } from "lucide-react";

interface Workflow {
  name: string;
  description: string;
  status: "active" | "paused";
  triggers: number;
  actions: number;
  lastRun: string;
}

const workflows: Workflow[] = [
  { name: "Auto-Connect with AI", description: "Send connection requests to scored leads", status: "active", triggers: 12, actions: 45, lastRun: "5 min ago" },
  { name: "Follow-up Sequence", description: "Automated DM follow-ups after connection", status: "active", triggers: 8, actions: 32, lastRun: "1 hour ago" },
  { name: "Lead Enrichment", description: "AI enriches new leads with company data", status: "paused", triggers: 5, actions: 15, lastRun: "2 days ago" },
  { name: "Content Scheduler", description: "Auto-post content to LinkedIn", status: "active", triggers: 3, actions: 10, lastRun: "3 hours ago" }
];

export const WorkflowCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {workflows.map((workflow) => (
        <Card key={workflow.name} className="card-hover">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linkedin-blue/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-linkedin-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                  <p className="text-xs text-gray-500">{workflow.description}</p>
                </div>
              </div>
              <Badge variant={workflow.status === "active" ? "default" : "secondary"} className="capitalize">
                {workflow.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>Triggers: {workflow.triggers}</span>
                <span>Actions: {workflow.actions}</span>
              </div>
              <span className="text-xs text-gray-400">Last run: {workflow.lastRun}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <Switch checked={workflow.status === "active"} />
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};