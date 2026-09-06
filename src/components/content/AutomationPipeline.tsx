import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  PenLine,
  ShieldCheck,
  Rocket,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PipelineStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "idle" | "processing" | "complete" | "error";
  description: string;
}

export function AutomationPipeline() {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("professional");
  const [steps, setSteps] = useState<PipelineStep[]>([
    { id: "ideate", label: "Ideate", icon: Lightbulb, status: "idle", description: "Generating content ideas" },
    { id: "draft", label: "Draft", icon: PenLine, status: "idle", description: "Crafting your post" },
    { id: "review", label: "Review", icon: ShieldCheck, status: "idle", description: "AI quality check" },
    { id: "publish", label: "Publish", icon: Rocket, status: "idle", description: "Publishing via n8n" },
  ]);

  const runPipeline = async () => {
    if (!topic.trim()) {
      toast({ title: "Topic required", description: "Please enter a topic for content ideation.", variant: "destructive" });
      return;
    }

    setIsRunning(true);
    setActiveStep(0);
    setSteps(steps.map((s, i) => ({ ...s, status: i === 0 ? "processing" : "idle" })));

    const stepDelay = 2000;

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      setSteps(steps.map((s, idx) => ({
        ...s,
        status: idx < i ? "complete" : idx === i ? "processing" : "idle",
      })));

      await new Promise(resolve => setTimeout(resolve, stepDelay));
    }

    setSteps(steps.map((s, i) => ({ ...s, status: "complete" })));
    setIsRunning(false);
    toast({ title: "Pipeline complete!", description: "Your content has been published via n8n." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Content Pipeline</h2>
          <p className="text-sm text-muted-foreground">
            Ideate, draft, review, and publish LinkedIn posts automatically
          </p>
        </div>
        <Button onClick={runPipeline} disabled={isRunning || !topic.trim()}>
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Start Pipeline
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-4 transition-all ${
                  step.status === "complete"
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : step.status === "processing"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 shadow-lg shadow-blue-500/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    className={`h-6 w-6 ${
                      step.status === "complete"
                        ? "text-green-500"
                        : step.status === "processing"
                        ? "text-blue-500 animate-pulse"
                        : "text-muted-foreground"
                    }`}
                  />
                  <Badge
                    variant={
                      step.status === "complete"
                        ? "default"
                        : step.status === "processing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {step.status === "complete" ? "✓" : step.status === "processing" ? "..." : index + 1}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{step.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeStep === 0 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Content Ideation
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., AI in Marketing"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche">Niche</Label>
                  <Input
                    id="niche"
                    placeholder="e.g., Marketing Professionals"
                    value={niche}
                    onChange={e => setNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}

          {activeStep === 1 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <PenLine className="h-5 w-5 text-blue-500" />
                Draft Generated
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-2">Hook:</p>
                  <p className="text-sm text-muted-foreground">
                    "The 5-minute morning routine that transformed my productivity."
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium text-sm mb-2">Body:</p>
                  <p className="text-sm text-muted-foreground">
                    For years, I started every day by checking my phone. Emails, Slack, notifications—I'd fall into the reactive trap before my brain even had a chance to wake up.
                    Then I discovered the power of intentional mornings...
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">#ProductivityTips</Badge>
                  <Badge variant="secondary">#CareerGrowth</Badge>
                  <Badge variant="secondary">#ProfessionalDevelopment</Badge>
                </div>
              </div>
            </Card>
          )}

          {activeStep === 2 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                AI Review Complete
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                  <span className="text-sm font-medium">Quality Score: 85/100</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Strong opening hook that captures attention
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Good use of formatting with emojis
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    Call-to-action is clear and engaging
                  </li>
                </ul>
              </div>
            </Card>
          )}

          {activeStep === 3 && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-500" />
                Published via n8n
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Your post has been published to LinkedIn through the n8n automation workflow.
                  </p>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-2xl font-bold">12.4K</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-2xl font-bold">892</p>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
