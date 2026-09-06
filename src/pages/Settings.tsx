import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Brain,
  Linkedin,
  Sparkles,
  CheckCircle2,
  Save,
  RefreshCw
} from "lucide-react";

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    agentAlerts: true,
    leadAlerts: true,
  });
  const [autoPublish, setAutoPublish] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account, agents, and integrations</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Reset to Defaults
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-violet-400" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-12 h-12 rounded-full ai-gradient flex items-center justify-center text-white font-bold">
                AC
              </div>
              <div>
                <p className="text-sm font-semibold">Alex Chen</p>
                <p className="text-xs text-muted-foreground">alex@company.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Full Name</Label>
                <Input defaultValue="Alex Chen" className="bg-secondary/50 border-border mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input defaultValue="alex@company.com" className="bg-secondary/50 border-border mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">LinkedIn Profile</Label>
                <Input defaultValue="linkedin.com/in/alexchen" className="bg-secondary/50 border-border mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Integration */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-400" />
              LinkedIn Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-400">Connected</span>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xs text-muted-foreground">as Alex Chen</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-medium">Premium</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Posts Remaining</span>
                <span className="font-medium">2,847 / month</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">API Rate</span>
                <span className="font-medium">Unlimited</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-border" size="sm">
              Reconnect Account
            </Button>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: "OpenAI", key: "sk-...7Yk2", status: "active" },
              { name: "Anthropic", key: "ant-...9Pm3", status: "active" },
              { name: "LinkedIn", key: "li-...4Xw8", status: "active" },
              { name: "Pinecone", key: "pc-...2Bn5", status: "active" },
            ].map((api) => (
              <div key={api.name} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 border border-border">
                <div>
                  <p className="text-sm font-medium">{api.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{api.key}</p>
                </div>
                <Badge variant="outline" className="text-[9px] border-green-500/30 text-green-400">Active</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full border-border" size="sm">
              <Key className="w-3.5 h-3.5 mr-1.5" />
              Add API Key
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Configuration */}
      <Card className="glass-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            AI Agent Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Ideator Agent", model: "GPT-4 + Web Search", desc: "Generates content ideas" },
              { name: "Drafter Agent", model: "Claude 3.5 Sonnet", desc: "Writes content" },
              { name: "Reviewer Agent", model: "GPT-4 + Custom Classifier", desc: "Reviews quality" },
              { name: "Publisher Agent", model: "Custom Scheduler", desc: "Schedules posts" },
            ].map((agent) => (
              <div key={agent.name} className="p-3 rounded-lg border border-border bg-secondary/20">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold">{agent.name}</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-[10px] text-muted-foreground mb-1">{agent.desc}</p>
                <code className="text-[10px] font-mono text-cyan-400">{agent.model}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Bell className="w-4 h-4 text-yellow-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
                <div>
                  <Label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <p className="text-[10px] text-muted-foreground">
                    {key === "email" && "Get notifications via email"}
                    {key === "push" && "Browser push notifications"}
                    {key === "weekly" && "Weekly summary reports"}
                    {key === "agentAlerts" && "AI agent error alerts"}
                    {key === "leadAlerts" && "New lead notifications"}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(c) => setNotifications(prev => ({ ...prev, [key]: c }))}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Automation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
              <div>
                <Label className="text-sm">Auto-publish approved posts</Label>
                <p className="text-[10px] text-muted-foreground">Skip manual approval step</p>
              </div>
              <Switch checked={autoPublish} onCheckedChange={setAutoPublish} />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
              <div>
                <Label className="text-sm">Auto-respond to comments</Label>
                <p className="text-[10px] text-muted-foreground">AI replies to comments automatically</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
              <div>
                <Label className="text-sm">Smart scheduling</Label>
                <p className="text-[10px] text-muted-foreground">AI chooses optimal posting times</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
              <div>
                <Label className="text-sm">Quality threshold</Label>
                <p className="text-[10px] text-muted-foreground">Minimum score: 85/100</p>
              </div>
              <Input defaultValue="85" className="w-16 h-7 text-xs bg-secondary/50" />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30">
              <div>
                <Label className="text-sm">Dark mode</Label>
                <p className="text-[10px] text-muted-foreground">Use dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="glass-card border-red-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-red-400">
            <Shield className="w-4 h-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-red-500/20 bg-red-500/5">
            <div>
              <Label className="text-sm">Disconnect LinkedIn</Label>
              <p className="text-[10px] text-muted-foreground">Remove LinkedIn account and stop all automation</p>
            </div>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Disconnect
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-red-500/20 bg-red-500/5">
            <div>
              <Label className="text-sm">Delete Account</Label>
              <p className="text-[10px] text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
