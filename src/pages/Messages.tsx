import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageTemplate } from "@/components/messages/MessageTemplate";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

const stats = [
  { label: "Scheduled", value: 24, icon: Clock, color: "text-blue-600" },
  { label: "Sent", value: 156, icon: MessageSquare, color: "text-green-600" },
  { label: "Delivered", value: 148, icon: CheckCircle, color: "text-purple-600" },
  { label: "Failed", value: 8, icon: XCircle, color: "text-red-600" }
];

export const Messages = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Message Outreach</h1>
        <Button className="linkedin-gradient">Create Campaign</Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MessageTemplate />
        
        <Card>
          <CardHeader>
            <CardTitle>Message Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Open Rate</span>
                <span className="font-semibold text-green-600">94.8%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "94.8%" }} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-semibold text-linkedin-blue">34.2%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="h-2 rounded-full bg-linkedin-blue" style={{ width: "34.2%" }} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Connection Rate</span>
                <span className="font-semibold text-purple-600">68.5%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: "68.5%" }} />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Your response rate is <span className="font-semibold text-green-600">23% higher</span> than the industry average.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};