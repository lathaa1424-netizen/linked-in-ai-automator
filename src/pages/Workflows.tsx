import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkflowCards } from "@/components/workflows/WorkflowCard";
import { Zap, ExternalLink, Settings } from "lucide-react";

export const Workflows = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">n8n Workflows</h1>
        <div className="flex space-x-3">
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open n8n
          </Button>
          <Button className="linkedin-gradient">
            <Zap className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                n8n Integration Status
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Your n8n instance is connected and running smoothly
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Connected</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <WorkflowCards />
    </div>
  );
};