import { AutomationPipeline } from "@/components/content/AutomationPipeline";
import { ContentIdeaCard } from "@/components/content/ContentIdeaCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Content() {
  const [activeTab, setActiveTab] = useState<string>("pipeline");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Content Automation</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" aria-label="Add new idea">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Button>
          <Button variant="outline" size="icon" aria-label="Refresh">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-14.736-2m0 0a8.003 8.003 0 0111.313-2m0 9a5.006 5.006 0 00-8.257 2m0 0a5.006 5.006 0 008.257-2M20 8v5" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="pivot" className="w-full">
          <TabsList className="grid w-full grid-cols-[120px_1fr]">
            <TabsTrigger value="pipeline" className="flex h-10 w-full items-center justify-center rounded-md border border-muted background-background hover:bg-muted/50">
              Automation Pipeline
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex h-10 w-full items-center justify-center rounded-md border border-muted background-background hover:bg-muted/50">
              Content Ideas
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex h-10 w-full items-center justify-center rounded-md border border-muted background-background hover:bg-muted/50">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex h-10 w-full items-center justify-center rounded-md border border-muted background-background hover:bg-muted/50">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="pt-4">
            <AutomationPipeline />
          </TabsContent>

          <TabsContent value="ideas" className="pt-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ContentIdeaCard
                                  idea={{
                                    id: "1",
                                    topic: "AI in Marketing",
                                    angle: "Practical tips for beginners",
                                    hooks: ["Stop wasting time on manual tasks", "Here's what nobody tells you about AI", "The 5-minute AI workflow that changed everything"],
                                    targetAudience: "Marketing professionals",
                                    estimatedEngagement: "high",
                                    status: "generated",
                                  }}
                                />
                                <ContentIdeaCard
                                  idea={{
                                    id: "2",
                                    topic: "Remote Work Productivity",
                                    angle: "Data-driven insights",
                                    hooks: ["The research behind async communication", "Why your meetings are killing productivity", "Numbers don't lie about remote work"],
                                    targetAudience: "Remote team leaders",
                                    estimatedEngagement: "medium",
                                    status: "approved",
                                  }}
                                />
                                <ContentIdeaCard
                                  idea={{
                                    id: "3",
                                    topic: "Startup Growth",
                                    angle: "Lessons from failures",
                                    hooks: ["What I learned after 3 failed startups", "The metrics that actually matter", "Don't make this mistake I did"],
                                    targetAudience: "Founders and early-stage entrepreneurs",
                                    estimatedEngagement: "high",
                                    status: "drafted",
                                  }}
                                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="pt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Content Calendar</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Week of Jan 15-21</h4>
                      <p className="text-sm text-muted-foreground">3 posts scheduled</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Calendar
                    </Button>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                        16
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">The 5-minute morning routine</p>
                        <p className="text-xs text-muted-foreground">Tue, Jan 16 • 9:00 AM</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                        </svg>
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                        18
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Founder regrets study</p>
                        <p className="text-xs text-muted-foreground">Thu, Jan 18 • 2:00 PM</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="pt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Content Performance</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Top Performing Posts</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Founder regrets study</p>
                          <p className="text-xs text-muted-foreground">18.2K impressions • 412 likes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500">
                          2
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Morning routine post</p>
                          <p className="text-xs text-muted-foreground">12.4K impressions • 234 likes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="h-96 bg-muted rounded-lg">
                    {/* Chart would go here */}
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Performance Chart
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}