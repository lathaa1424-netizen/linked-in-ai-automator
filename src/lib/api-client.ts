// Mock Agent Microservice API Client
// Simulates the AutoGen-style agent pipeline

import { agents, initialChat, posts, workflows, leads, activities, metrics, engagementData } from "./data";
import type { Agent, ChatMessage, ContentPost, Workflow, Lead, ActivityEvent, Metric } from "./data";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated in-memory state
let currentAgentStatuses = agents.map(a => ({ ...a }));
let chatHistory: ChatMessage[] = [...initialChat];
let currentPipelineStep = 0;
let pipelineRunning = false;

export const api = {
  // Agents
  async getAgents(): Promise<Agent[]> {
    await delay(200);
    return currentAgentStatuses;
  },

  async getAgent(id: string): Promise<Agent | undefined> {
    await delay(100);
    return currentAgentStatuses.find(a => a.id === id);
  },

  // Chat
  async getChatHistory(): Promise<ChatMessage[]> {
    await delay(100);
    return chatHistory;
  },

  async sendMessage(content: string): Promise<ChatMessage[]> {
    await delay(300);
    
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
    };
    chatHistory = [...chatHistory, userMsg];

    // Simulate agent responses
    await delay(800);
    const orchestratorMsg: ChatMessage = {
      id: `msg-${Date.now()}-orchestrator`,
      role: "agent",
      agentId: "orchestrator",
      content: "Understood. Routing your request through the multi-agent pipeline. Starting ideation phase...",
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      metadata: { tokens: 32, duration: 0.5 },
    };
    chatHistory = [...chatHistory, orchestratorMsg];

    await delay(1500);
    const ideatorMsg: ChatMessage = {
      id: `msg-${Date.now()}-ideator`,
      role: "agent",
      agentId: "ideator",
      content: `Great topic! I've identified 3 high-potential angles based on current trends and your audience data:\n\n1. **Multi-agent systems replacing traditional automation** — High relevance, emerging trend\n2. **The ROI breakdown of autonomous agents** — Data-driven, proven to perform well\n3. **How to prepare your team for agentic AI** — Actionable, drives engagement\n\nI'll proceed with Option 1. Moving to drafting...`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      metadata: { tokens: 156, duration: 1.2, model: "GPT-4 + Web Search" },
    };
    chatHistory = [...chatHistory, ideatorMsg];

    await delay(2000);
    const drafterMsg: ChatMessage = {
      id: `msg-${Date.now()}-drafter`,
      role: "agent",
      agentId: "drafter",
      content: `Draft complete!\n\n📝 **Title**: "The Quiet Revolution: When AI Stops Assisting and Starts Acting"\n\nI've crafted a 2,890-character post with:\n• Powerful opening hook\n• 4 real-world examples\n• Data point from 2024 enterprise survey\n• Thought-provoking closing question\n• Optimized hashtags\n\nReadability: 94/100 | Brand voice: ✓ | Engagement hooks: 3x\n\nPassing to Reviewer...`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      metadata: { tokens: 1872, duration: 2.1, model: "Claude 3.5 Sonnet" },
    };
    chatHistory = [...chatHistory, drafterMsg];

    await delay(1500);
    const reviewerMsg: ChatMessage = {
      id: `msg-${Date.now()}-reviewer`,
      role: "agent",
      agentId: "reviewer",
      content: `Review complete. **Quality Score: 91/100**\n\n✅ Brand voice: Consistent\n✅ Compliance: No issues\n✅ Predicted engagement: High (top 20%)\n✅ Character count: Optimal\n\n⚠️ Minor: Consider shortening second paragraph for better mobile readability.\n\n**Verdict**: Ready to publish with suggested edit applied.`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      metadata: { tokens: 245, duration: 1.5, model: "GPT-4 + Classifier" },
    };
    chatHistory = [...chatHistory, reviewerMsg];

    await delay(800);
    const orchestratorFinalMsg: ChatMessage = {
      id: `msg-${Date.now()}-orchestrator-final`,
      role: "agent",
      agentId: "orchestrator",
      content: "Pipeline complete! Post approved with 91/100 quality score. Ready for scheduling or immediate publication.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      metadata: { tokens: 18, duration: 0.3 },
    };
    chatHistory = [...chatHistory, orchestratorFinalMsg];

    return chatHistory;
  },

  // Content
  async getPosts(): Promise<ContentPost[]> {
    await delay(200);
    return posts;
  },

  async createPost(data: Partial<ContentPost>): Promise<ContentPost> {
    await delay(300);
    const newPost: ContentPost = {
      id: `p${posts.length + 1}`,
      title: data.title || "Untitled",
      content: data.content || "",
      status: "idea",
      topic: data.topic || "General",
      hashtags: data.hashtags || [],
      author: { name: "Alex Chen", avatar: "AC" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    return newPost;
  },

  async runContentPipeline(postId: string): Promise<{ success: boolean; steps: string[] }> {
    await delay(2000);
    return {
      success: true,
      steps: [
        "Ideator: Analyzing trending topics...",
        "Ideator: Generated 3 topic angles",
        "Drafter: Crafting post with brand voice...",
        "Drafter: Draft complete (2,890 chars)",
        "Reviewer: Quality check (score: 91/100)",
        "Reviewer: Compliance check passed",
        "Pipeline complete!",
      ],
    };
  },

  // Workflows
  async getWorkflows(): Promise<Workflow[]> {
    await delay(200);
    return workflows;
  },

  async toggleWorkflow(id: string): Promise<Workflow | undefined> {
    await delay(200);
    const workflow = workflows.find(w => w.id === id);
    if (workflow) {
      workflow.status = workflow.status === "active" ? "paused" : "active";
    }
    return workflow;
  },

  async runWorkflow(id: string): Promise<{ success: boolean; message: string }> {
    await delay(1500);
    return {
      success: true,
      message: `Workflow "${workflows.find(w => w.id === id)?.name}" executed successfully`,
    };
  },

  // Dashboard
  async getMetrics(): Promise<Metric[]> {
    await delay(100);
    return metrics;
  },

  async getActivities(): Promise<ActivityEvent[]> {
    await delay(100);
    return activities;
  },

  async getEngagementData() {
    await delay(100);
    return engagementData;
  },

  // Leads
  async getLeads(): Promise<Lead[]> {
    await delay(200);
    return leads;
  },
};

export default api;
