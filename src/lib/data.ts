// Shared types and mock data for the LinkedIn AI Automation Platform

export type AgentRole = "orchestrator" | "ideator" | "drafter" | "reviewer" | "publisher";
export type AgentStatus = "idle" | "thinking" | "working" | "complete" | "error";
export type ContentStatus = "idea" | "drafting" | "review" | "scheduled" | "published" | "rejected";
export type WorkflowStatus = "active" | "paused" | "draft" | "error";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  description: string;
  model: string;
  avatar: string;
  tasksCompleted: number;
  successRate: number;
  avgResponseTime: number;
  currentTask?: string;
  capabilities: string[];
  lastActive?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "agent" | "system";
  agentId?: string;
  content: string;
  timestamp: string;
  metadata?: {
    tokens?: number;
    duration?: number;
    model?: string;
  };
}

export interface ContentPost {
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  topic: string;
  hashtags: string[];
  score?: number;
  reviewNotes?: string;
  scheduledFor?: string;
  publishedAt?: string;
  engagement?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: string;
  lastRun?: string;
  nextRun?: string;
  runs: number;
  successRate: number;
  steps: WorkflowStep[];
  category: "content" | "leads" | "engagement" | "analytics";
}

export interface WorkflowStep {
  id: string;
  type: "trigger" | "agent" | "condition" | "action" | "ai" | "delay" | "linkedin";
  label: string;
  description: string;
  icon: string;
  config?: Record<string, any>;
  position: { x: number; y: number };
}

export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  score: number;
  status: "new" | "qualified" | "engaged" | "connected" | "lost";
  tags: string[];
  lastActivity: string;
  source: string;
}

export interface ActivityEvent {
  id: string;
  type: "post_published" | "lead_engaged" | "agent_action" | "workflow_completed" | "review_submitted" | "connection_made";
  message: string;
  agent?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Metric {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: string;
}

// === AGENTS ===
export const agents: Agent[] = [
  {
    id: "orchestrator",
    name: "Master Orchestrator",
    role: "orchestrator",
    status: "working",
    description: "Coordinates multi-agent collaboration and routes tasks across the pipeline",
    model: "GPT-4 Turbo",
    avatar: "🧠",
    tasksCompleted: 1247,
    successRate: 99.2,
    avgResponseTime: 0.8,
    currentTask: "Coordinating pipeline #4521",
    capabilities: ["Task Routing", "Memory Management", "Context Sharing", "Error Recovery"],
    lastActive: "now",
  },
  {
    id: "ideator",
    name: "Ideator Agent",
    role: "ideator",
    status: "complete",
    description: "Generates creative, on-brand content ideas using trend analysis and audience insights",
    model: "GPT-4 + Web Search",
    avatar: "💡",
    tasksCompleted: 892,
    successRate: 96.8,
    avgResponseTime: 1.2,
    currentTask: "Analyzing trending topics",
    capabilities: ["Trend Analysis", "Audience Research", "Topic Generation", "Hashtag Strategy"],
    lastActive: "2m ago",
  },
  {
    id: "drafter",
    name: "Drafter Agent",
    role: "drafter",
    status: "working",
    description: "Crafts compelling LinkedIn posts with brand voice consistency and engagement optimization",
    model: "Claude 3.5 Sonnet",
    avatar: "✍️",
    tasksCompleted: 1456,
    successRate: 97.4,
    avgResponseTime: 2.1,
    currentTask: "Drafting post on AI trends",
    capabilities: ["Content Writing", "Brand Voice", "Hook Crafting", "CTA Optimization"],
    lastActive: "now",
  },
  {
    id: "reviewer",
    name: "Reviewer Agent",
    role: "reviewer",
    status: "thinking",
    description: "Quality assurance, compliance check, and engagement prediction for every post",
    model: "GPT-4 + Custom Classifier",
    avatar: "🔍",
    tasksCompleted: 2103,
    successRate: 94.6,
    avgResponseTime: 1.5,
    currentTask: "Reviewing draft #4521",
    capabilities: ["Quality Scoring", "Compliance Check", "Engagement Prediction", "Tone Analysis"],
    lastActive: "now",
  },
  {
    id: "publisher",
    name: "Publisher Agent",
    role: "publisher",
    status: "idle",
    description: "Schedules and publishes content across LinkedIn with optimal timing",
    model: "Custom Scheduler",
    avatar: "📤",
    tasksCompleted: 734,
    successRate: 99.8,
    avgResponseTime: 0.4,
    currentTask: "Awaiting approved content",
    capabilities: ["Smart Scheduling", "A/B Testing", "Multi-account", "Analytics Tracking"],
    lastActive: "12m ago",
  },
];

// === CHAT HISTORY ===
export const initialChat: ChatMessage[] = [
  {
    id: "1",
    role: "system",
    content: "Agent pipeline initialized. 4 specialized agents ready for collaboration.",
    timestamp: "10:42:01",
  },
  {
    id: "2",
    role: "user",
    content: "Generate a thought leadership post about the future of AI agents in enterprise workflows",
    timestamp: "10:42:05",
  },
  {
    id: "3",
    role: "agent",
    agentId: "orchestrator",
    content: "I'll coordinate the team. Routing to Ideator for topic ideation...",
    timestamp: "10:42:06",
    metadata: { tokens: 24, duration: 0.4 },
  },
  {
    id: "4",
    role: "agent",
    agentId: "ideator",
    content: "Analyzing 3 trending topics:\n1. Multi-agent orchestration in enterprise\n2. ROI of AI automation in B2B sales\n3. The shift from copilots to autonomous agents\n\nI'll pursue #3 — high engagement potential based on audience data.",
    timestamp: "10:42:09",
    metadata: { tokens: 86, duration: 1.2, model: "GPT-4 + Web Search" },
  },
  {
    id: "5",
    role: "agent",
    agentId: "drafter",
    content: "Draft ready. Applied brand voice (professional, forward-looking), included hook, 3 key insights, and CTA. Character count: 2,847. Readability score: 92/100.",
    timestamp: "10:42:14",
    metadata: { tokens: 1240, duration: 2.1, model: "Claude 3.5 Sonnet" },
  },
  {
    id: "6",
    role: "agent",
    agentId: "reviewer",
    content: "Review complete. Score: 94/100.\n✓ Brand voice consistent\n✓ No compliance issues\n✓ Predicted engagement: High (top 15%)\n\nMinor suggestion: Strengthen closing CTA for better click-through.",
    timestamp: "10:42:18",
    metadata: { tokens: 312, duration: 1.5, model: "GPT-4 + Classifier" },
  },
  {
    id: "7",
    role: "agent",
    agentId: "orchestrator",
    content: "All agents complete. Post approved with 94/100 quality score. Ready for scheduling or immediate publication.",
    timestamp: "10:42:20",
    metadata: { tokens: 28, duration: 0.3 },
  },
];

// === POSTS ===
export const posts: ContentPost[] = [
  {
    id: "p1",
    title: "The Rise of Autonomous AI Agents",
    content: "We're witnessing a fundamental shift in how AI operates in the enterprise.\n\nFor the past two years, \"copilots\" have dominated the conversation. But 2025 marks the year of autonomous agents — AI that doesn't just assist but actually executes.\n\nHere's what this means for businesses:\n\n→ 73% of repetitive workflows can be fully automated by agent systems\n→ Companies report 4.2x ROI within 6 months of deployment\n→ The role of \"AI managers\" is emerging — humans who orchestrate agent teams\n\nThe companies winning today aren't using AI to write faster emails. They're using AI to run entire business processes while their teams focus on strategy.\n\nThe question isn't whether to adopt agent systems. It's how fast you can build the muscle to manage them.\n\nWhat's your experience with AI agents in your organization?",
    status: "published",
    topic: "AI Strategy",
    hashtags: ["AI", "Automation", "FutureOfWork", "EnterpriseAI"],
    score: 94,
    publishedAt: "2025-01-15T10:30:00Z",
    engagement: { views: 12453, likes: 487, comments: 89, shares: 124 },
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-14T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "p2",
    title: "Why Most AI Projects Fail (And How to Succeed)",
    content: "After analyzing 200+ AI implementations, here's the uncomfortable truth:\n\nMost AI projects don't fail because of bad technology. They fail because of bad process.\n\nThe pattern I see repeatedly:\n\n❌ Starting with the technology, not the problem\n❌ Trying to automate broken workflows\n❌ Ignoring change management\n❌ Measuring success wrong\n\nThe companies that succeed do the opposite:\n\n✓ Start with the highest-friction workflow\n✓ Fix the process before adding AI\n✓ Invest 3x more in adoption than the tech\n✓ Measure time saved, not just accuracy\n\nThe real unlock isn't a better model. It's better thinking about the problem.\n\nWhat's the biggest AI failure you've witnessed?",
    status: "published",
    topic: "AI Implementation",
    hashtags: ["AI", "Leadership", "Strategy", "DigitalTransformation"],
    score: 91,
    publishedAt: "2025-01-13T14:00:00Z",
    engagement: { views: 8921, likes: 342, comments: 67, shares: 89 },
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-13T14:00:00Z",
  },
  {
    id: "p3",
    title: "Building Trust in AI Systems",
    content: "Trust is the currency of AI adoption.\n\nWithout it, even the most accurate models get ignored. With it, mediocre models transform entire organizations.\n\nThree pillars of AI trust I've observed:\n\n1. **Transparency** — Show your work. Users need to understand why AI made a decision.\n\n2. **Control** — Always keep a human in the loop for high-stakes decisions.\n\n3. **Consistency** — Predictable behavior beats occasional brilliance.\n\nThe companies building trust are the ones winning the long game.",
    status: "review",
    topic: "AI Ethics",
    hashtags: ["AI", "Trust", "Ethics", "Governance"],
    score: 88,
    reviewNotes: "Strong content. Suggest adding concrete example to strengthen second pillar.",
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-15T09:15:00Z",
    updatedAt: "2025-01-15T11:00:00Z",
  },
  {
    id: "p4",
    title: "The Future of Remote Work with AI",
    content: "Remote work + AI = ??\n\nWe're still figuring it out, but early signals are clear:\n\nAI is making remote teams MORE productive than in-office teams were in 2019.\n\nThe tools that win aren't the ones replacing humans. They're the ones removing friction — async communication, knowledge management, decision-making.\n\nThe future isn't remote vs. office. It's augmented vs. unaugmented.",
    status: "scheduled",
    topic: "Future of Work",
    hashtags: ["RemoteWork", "AI", "Productivity", "FutureOfWork"],
    score: 92,
    scheduledFor: "2025-01-16T15:00:00Z",
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "p5",
    title: "5 Lessons from Scaling AI in B2B",
    content: "5 hard-earned lessons from scaling AI across B2B organizations:\n\n1. Start with sales, not marketing\n2. Build feedback loops into everything\n3. Your data is messier than you think\n4. Champions > tools\n5. Patience compounds\n\nDM me if you want the deep-dive.",
    status: "drafting",
    topic: "B2B Sales",
    hashtags: ["B2B", "AI", "Sales", "Scale"],
    score: undefined,
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-15T11:30:00Z",
    updatedAt: "2025-01-15T11:45:00Z",
  },
  {
    id: "p6",
    title: "Why I Stopped Using 'AI' in My Marketing",
    content: "Controversial take: The word 'AI' is hurting your marketing.\n\nHere's what happened when I removed it from our landing pages:\n\n→ Conversion rate up 34%\n→ Qualified leads up 67%\n→ Sales cycle shortened by 2 weeks\n\nWhy? Because 'AI' has become meaningless. Everyone says it. Nobody trusts it.\n\nInstead, talk about outcomes. Specific results. Real transformations.\n\nThe future of AI marketing isn't 'powered by AI.' It's 'you just saved 4 hours this week.'",
    status: "idea",
    topic: "Marketing",
    hashtags: ["Marketing", "AI", "Copywriting", "Growth"],
    score: undefined,
    author: { name: "Alex Chen", avatar: "AC" },
    createdAt: "2025-01-15T12:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
  },
];

// === WORKFLOWS ===
export const workflows: Workflow[] = [
  {
    id: "w1",
    name: "Daily Thought Leadership Pipeline",
    description: "Generates and publishes 1 thought leadership post daily using the full agent pipeline",
    status: "active",
    trigger: "Daily at 9:00 AM",
    lastRun: "2025-01-15T09:00:00Z",
    nextRun: "2025-01-16T09:00:00Z",
    runs: 247,
    successRate: 98.4,
    category: "content",
    steps: [
      { id: "s1", type: "trigger", label: "Schedule Trigger", description: "9:00 AM daily", icon: "⏰", position: { x: 0, y: 0 } },
      { id: "s2", type: "agent", label: "Ideator Agent", description: "Generate 3 topic ideas", icon: "💡", position: { x: 1, y: 0 } },
      { id: "s3", type: "agent", label: "Drafter Agent", description: "Write post (2,500-3,000 chars)", icon: "✍️", position: { x: 2, y: 0 } },
      { id: "s4", type: "agent", label: "Reviewer Agent", description: "Quality score ≥ 85", icon: "🔍", position: { x: 3, y: 0 } },
      { id: "s5", type: "condition", label: "Score Check", description: "If score ≥ 85, proceed", icon: "🔀", position: { x: 4, y: 0 } },
      { id: "s6", type: "linkedin", label: "Publish to LinkedIn", description: "Optimal timing", icon: "📤", position: { x: 5, y: 0 } },
    ],
  },
  {
    id: "w2",
    name: "Engagement Responder",
    description: "Auto-respond to post comments with personalized, on-brand replies",
    status: "active",
    trigger: "On new comment",
    lastRun: "2025-01-15T11:24:00Z",
    nextRun: "On event",
    runs: 1432,
    successRate: 96.2,
    category: "engagement",
    steps: [
      { id: "s1", type: "trigger", label: "LinkedIn Webhook", description: "New comment event", icon: "🔔", position: { x: 0, y: 0 } },
      { id: "s2", type: "ai", label: "Sentiment Analysis", description: "Classify comment intent", icon: "🧠", position: { x: 1, y: 0 } },
      { id: "s3", type: "agent", label: "Drafter Agent", description: "Generate contextual reply", icon: "✍️", position: { x: 2, y: 0 } },
      { id: "s4", type: "agent", label: "Reviewer Agent", description: "Check tone & compliance", icon: "🔍", position: { x: 3, y: 0 } },
      { id: "s5", type: "action", label: "Post Reply", description: "Send via LinkedIn API", icon: "💬", position: { x: 4, y: 0 } },
    ],
  },
  {
    id: "w3",
    name: "Lead Scoring & Outreach",
    description: "Analyzes profile visitors and scores them for personalized outreach",
    status: "active",
    trigger: "On profile view",
    lastRun: "2025-01-15T10:15:00Z",
    nextRun: "On event",
    runs: 892,
    successRate: 94.7,
    category: "leads",
    steps: [
      { id: "s1", type: "trigger", label: "Profile View Event", description: "Webhook from LinkedIn", icon: "👁️", position: { x: 0, y: 0 } },
      { id: "s2", type: "ai", label: "Lead Scoring", description: "Score 0-100", icon: "🎯", position: { x: 1, y: 0 } },
      { id: "s3", type: "condition", label: "Score Filter", description: "If score ≥ 70", icon: "🔀", position: { x: 2, y: 0 } },
      { id: "s4", type: "agent", label: "Drafter Agent", description: "Personalized message", icon: "✍️", position: { x: 3, y: 0 } },
      { id: "s5", type: "delay", label: "Wait 24h", description: "Avoid spam signals", icon: "⏳", position: { x: 4, y: 0 } },
      { id: "s6", type: "action", label: "Send DM", description: "Via LinkedIn API", icon: "📨", position: { x: 5, y: 0 } },
    ],
  },
  {
    id: "w4",
    name: "Weekly Performance Report",
    description: "Compiles engagement analytics and generates insights every Monday",
    status: "paused",
    trigger: "Weekly on Monday",
    lastRun: "2025-01-13T08:00:00Z",
    nextRun: "2025-01-20T08:00:00Z",
    runs: 34,
    successRate: 100,
    category: "analytics",
    steps: [
      { id: "s1", type: "trigger", label: "Schedule", description: "Monday 8 AM", icon: "⏰", position: { x: 0, y: 0 } },
      { id: "s2", type: "action", label: "Fetch Analytics", description: "LinkedIn API", icon: "📊", position: { x: 1, y: 0 } },
      { id: "s3", type: "agent", label: "Reviewer Agent", description: "Generate insights", icon: "🔍", position: { x: 2, y: 0 } },
      { id: "s4", type: "action", label: "Email Report", description: "To team", icon: "📧", position: { x: 3, y: 0 } },
    ],
  },
  {
    id: "w5",
    name: "Trend Hijack Engine",
    description: "Monitors trending topics and generates timely content within 2 hours",
    status: "draft",
    trigger: "On trending topic",
    runs: 0,
    successRate: 0,
    category: "content",
    steps: [
      { id: "s1", type: "trigger", label: "Trend Monitor", description: "Detect viral topics", icon: "📈", position: { x: 0, y: 0 } },
      { id: "s2", type: "ai", label: "Relevance Check", description: "Score topic fit", icon: "🧠", position: { x: 1, y: 0 } },
      { id: "s3", type: "agent", label: "Ideator Agent", description: "Generate angle", icon: "💡", position: { x: 2, y: 0 } },
      { id: "s4", type: "agent", label: "Drafter Agent", description: "Quick draft", icon: "✍️", position: { x: 3, y: 0 } },
      { id: "s5", type: "linkedin", label: "Publish Fast", description: "Within 2 hours", icon: "🚀", position: { x: 4, y: 0 } },
    ],
  },
];

// === LEADS ===
export const leads: Lead[] = [
  { id: "l1", name: "Sarah Johnson", title: "VP of Engineering", company: "TechCorp", avatar: "SJ", score: 94, status: "qualified", tags: ["Hot Lead", "Enterprise"], lastActivity: "2h ago", source: "Profile View" },
  { id: "l2", name: "Michael Chen", title: "Head of Growth", company: "ScaleAI", avatar: "MC", score: 88, status: "engaged", tags: ["Decision Maker", "AI"], lastActivity: "5h ago", source: "Comment" },
  { id: "l3", name: "Emily Rodriguez", title: "Director of Marketing", company: "InnovateLabs", avatar: "ER", score: 82, status: "connected", tags: ["Marketing", "B2B"], lastActivity: "1d ago", source: "Connection" },
  { id: "l4", name: "David Park", title: "CTO", company: "FutureStack", avatar: "DP", score: 76, status: "new", tags: ["Tech", "Startup"], lastActivity: "3h ago", source: "Search" },
  { id: "l5", name: "Lisa Wang", title: "Product Manager", company: "DataFlow", avatar: "LW", score: 71, status: "qualified", tags: ["Product", "Mid-Market"], lastActivity: "6h ago", source: "Post Engagement" },
  { id: "l6", name: "James Miller", title: "CEO", company: "NextGen", avatar: "JM", score: 68, status: "new", tags: ["Executive", "SaaS"], lastActivity: "12h ago", source: "Profile View" },
];

// === ACTIVITY ===
export const activities: ActivityEvent[] = [
  { id: "a1", type: "post_published", message: "Published \"The Rise of Autonomous AI Agents\"", agent: "Publisher Agent", timestamp: "2m ago" },
  { id: "a2", type: "review_submitted", message: "Reviewer approved post with 94/100 score", agent: "Reviewer Agent", timestamp: "5m ago" },
  { id: "a3", type: "agent_action", message: "Drafter completed draft on AI agents", agent: "Drafter Agent", timestamp: "8m ago" },
  { id: "a4", type: "lead_engaged", message: "Sarah Johnson viewed profile", timestamp: "12m ago" },
  { id: "a5", type: "workflow_completed", message: "Daily Thought Leadership Pipeline completed", timestamp: "1h ago" },
  { id: "a6", type: "connection_made", message: "New connection: Michael Chen", timestamp: "2h ago" },
  { id: "a7", type: "post_published", message: "Published \"Why Most AI Projects Fail\"", agent: "Publisher Agent", timestamp: "1d ago" },
  { id: "a8", type: "agent_action", message: "Ideator generated 5 new topic ideas", agent: "Ideator Agent", timestamp: "1d ago" },
];

// === METRICS ===
export const metrics: Metric[] = [
  { label: "Posts Published", value: "247", delta: 12.5, trend: "up", icon: "📤", color: "violet" },
  { label: "Total Engagement", value: "48.2K", delta: 24.3, trend: "up", icon: "💬", color: "cyan" },
  { label: "Leads Captured", value: "1,847", delta: 8.7, trend: "up", icon: "👥", color: "green" },
  { label: "AI Tasks Run", value: "12,453", delta: 0, trend: "neutral", icon: "🤖", color: "purple" },
  { label: "Avg Quality Score", value: "92.4", delta: 3.2, trend: "up", icon: "⭐", color: "yellow" },
  { label: "Time Saved", value: "342h", delta: 18.6, trend: "up", icon: "⏱️", color: "pink" },
];

// === CHART DATA ===
export const engagementData = [
  { date: "Mon", engagement: 1240, reach: 4200, clicks: 89 },
  { date: "Tue", engagement: 1890, reach: 5400, clicks: 124 },
  { date: "Wed", engagement: 2340, reach: 6100, clicks: 167 },
  { date: "Thu", engagement: 1980, reach: 5800, clicks: 142 },
  { date: "Fri", engagement: 2890, reach: 7200, clicks: 198 },
  { date: "Sat", engagement: 1620, reach: 4900, clicks: 98 },
  { date: "Sun", engagement: 1340, reach: 4400, clicks: 76 },
];

export const agentPerformanceData = [
  { agent: "Ideator", tasks: 892, success: 96.8 },
  { agent: "Drafter", tasks: 1456, success: 97.4 },
  { agent: "Reviewer", tasks: 2103, success: 94.6 },
  { agent: "Publisher", tasks: 734, success: 99.8 },
];

export const contentTypeData = [
  { name: "Thought Leadership", value: 45, color: "hsl(var(--violet-500))" },
  { name: "How-to / Tutorial", value: 25, color: "hsl(var(--cyan-500))" },
  { name: "Industry News", value: 15, color: "hsl(var(--linkedin-light))" },
  { name: "Personal Story", value: 10, color: "hsl(var(--warning))" },
  { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
];
