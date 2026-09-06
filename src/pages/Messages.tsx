import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Send,
  Sparkles,
  Search,
  Reply,
  CheckCheck,
  Clock,
  MoreHorizontal,
  Paperclip,
  Smile,
  Bot,
  User,
  Inbox,
  Archive,
  Star
} from "lucide-react";

const conversations = [
  { id: 1, name: "Sarah Johnson", avatar: "SJ", lastMessage: "Thanks for the insights! Would love to chat more about...", time: "2m", unread: 2, status: "online", preview: "Would love to chat more about..." },
  { id: 2, name: "Michael Chen", avatar: "MC", lastMessage: "Interesting take on AI agents. Can you share that article?", time: "1h", unread: 0, status: "away", preview: "Can you share that article?" },
  { id: 3, name: "Emily Rodriguez", avatar: "ER", lastMessage: "Let's set up a call next week to discuss", time: "3h", unread: 1, status: "offline", preview: "Set up a call next week" },
  { id: 4, name: "David Park", avatar: "DP", lastMessage: "The case study you shared was really helpful", time: "1d", unread: 0, status: "offline", preview: "The case study you shared..." },
  { id: 5, name: "Lisa Wang", avatar: "LW", lastMessage: "Just signed up for the trial! Excited to try it", time: "2d", unread: 0, status: "online", preview: "Just signed up for the trial" },
];

const sampleMessages = [
  { id: 1, from: "them", content: "Hey! Loved your recent post on AI agents. Really resonated with our team's experience.", time: "10:42 AM" },
  { id: 2, from: "agent", content: "AI suggested reply: Hi Sarah! Thanks so much for reaching out. I'd love to hear more about your team's experience with AI agents. What were the biggest wins and challenges you faced?", time: "10:42 AM" },
  { id: 3, from: "me", content: "Hi Sarah! Thanks for the kind words. Always great to connect with someone who gets the AI agent space. What's your team working on?", time: "10:43 AM" },
  { id: 4, from: "them", content: "We're scaling our customer success team with AI agents. Would love to chat more about...", time: "10:45 AM" },
];

export const Messages = () => {
  const [selectedConv, setSelectedConv] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Messages</h1>
              <p className="text-sm text-muted-foreground">AI-assisted conversation management with smart reply suggestions</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border hover:bg-secondary/50" size="sm">
            <Archive className="w-3.5 h-3.5 mr-1.5" />
            Archive
          </Button>
          <Button className="btn-gradient text-white shadow-lg shadow-primary/20" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Unread", value: 3, icon: Inbox, color: "violet" },
          { label: "Response Rate", value: "92%", icon: Reply, color: "cyan" },
          { label: "Avg Reply Time", value: "1.2h", icon: Clock, color: "yellow" },
          { label: "Active Convos", value: 24, icon: MessageSquare, color: "green" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 border border-border card-hover">
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg ${
                stat.color === "violet" ? "bg-violet-500/10 text-violet-400" :
                stat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" :
                stat.color === "yellow" ? "bg-yellow-500/10 text-yellow-400" :
                "bg-green-500/10 text-green-400"
              } flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="glass-card border-border overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
          {/* Conversations List */}
          <div className="border-r border-border flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9 h-8 text-sm bg-secondary/50" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv.id)}
                  className={`p-3 border-b border-border cursor-pointer transition-colors ${
                    selectedConv === conv.id ? "bg-primary/10" : "hover:bg-secondary/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 rounded-full ai-gradient flex items-center justify-center text-white text-xs font-bold">
                        {conv.avatar}
                      </div>
                      {conv.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">{conv.name}</span>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Header */}
            <div className="p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full ai-gradient flex items-center justify-center text-white text-xs font-bold">
                    SJ
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Sarah Johnson</h3>
                  <p className="text-[10px] text-muted-foreground">VP Engineering at TechCorp · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded hover:bg-secondary/50">
                  <Star className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="p-2 rounded hover:bg-secondary/50">
                  <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {sampleMessages.map((msg) => {
                if (msg.from === "agent") {
                  return (
                    <div key={msg.id} className="flex items-start gap-2 animate-fade-in">
                      <div className="w-7 h-7 rounded-lg ai-gradient flex items-center justify-center text-white flex-shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="max-w-md">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-semibold gradient-text">AI Assistant</span>
                          <Badge variant="outline" className="text-[9px] py-0 h-3.5 border-primary/30 text-primary">Suggestion</Badge>
                        </div>
                        <div className="p-2.5 rounded-xl bg-secondary/50 border border-border">
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                            Use this
                          </button>
                          <button className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground hover:text-foreground">
                            Regenerate
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (msg.from === "me") {
                  return (
                    <div key={msg.id} className="flex justify-end animate-slide-in-right">
                      <div className="max-w-md">
                        <div className="p-2.5 rounded-xl ai-gradient text-white">
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-right mt-1 flex items-center justify-end gap-1">
                          <CheckCheck className="w-3 h-3" />
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className="flex items-start gap-2 animate-fade-in">
                    <div className="w-7 h-7 rounded-full ai-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      SJ
                    </div>
                    <div className="max-w-md">
                      <div className="p-2.5 rounded-xl bg-secondary border border-border">
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded hover:bg-secondary/50">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary/50 border-border"
                />
                <button className="p-2 rounded hover:bg-secondary/50">
                  <Smile className="w-4 h-4 text-muted-foreground" />
                </button>
                <Button className="btn-gradient text-white" size="sm">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">AI suggests 3 reply options</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
