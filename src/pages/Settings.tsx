import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin-email">LinkedIn Email</Label>
              <Input id="linkedin-email" type="email" placeholder="your@email.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin-app-id">LinkedIn App ID</Label>
              <Input id="linkedin-app-id" placeholder="8XXXXX" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin-app-secret">LinkedIn App Secret</Label>
              <Input id="linkedin-app-secret" type="password" placeholder="••••••••" />
            </div>
            
            <Button className="linkedin-gradient">Save Configuration</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>n8n Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="n8n-url">n8n Instance URL</Label>
              <Input id="n8n-url" placeholder="https://your-n8n-instance.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="n8n-api-key">n8n API Key</Label>
              <Input id="n8n-api-key" type="password" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-sync workflows</Label>
                <p className="text-xs text-gray-500">Automatically sync workflow data</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <Button variant="outline">Test Connection</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input id="openai-key" type="password" placeholder="sk-..." />
            </div>
            
            <div className="space-y-2">
              <Label>AI Model</Label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                <option>GPT-4</option>
                <option>GPT-3.5-Turbo</option>
                <option>Claude-3</option>
              </select>
            </div>
            
            <Button variant="outline">Save AI Settings</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Automation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Limits</Label>
                <p className="text-xs text-gray-500">Max 100 messages/day</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Randomize Timing</Label>
                <p className="text-xs text-gray-500">Add natural delays between actions</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Reply</Label>
                <p className="text-xs text-gray-500">Automatically respond to common messages</p>
              </div>
              <Switch checked={false} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};