import { defineHandler } from "nitro";
import { readBody } from "nitro/h3";

interface DraftPost {
  id: string;
  ideaId: string;
  content: string;
  hook: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  estimatedReadTime: number;
  tone: "professional" | "casual" | "inspirational" | "educational";
  status: "draft" | "review" | "approved" | "scheduled" | "published";
  createdAt: string;
  wordCount: number;
}

export default defineHandler(async (event) => {
  const body = await readBody<{ 
    ideaId?: string; 
    topic?: string; 
    hook?: string;
    tone?: "professional" | "casual" | "inspirational" | "educational";
    targetLength?: number;
  }>(event);

  const { ideaId, topic, hook, tone = "professional", targetLength = 300 } = body;

  // Simulate AI drafting - generate realistic LinkedIn post content
  const samplePosts: Record<string, { hook: string; body: string; cta: string }> = {
    "1": {
      hook: "The 5-minute morning routine that transformed my productivity.",
      body: `For years, I started every day by checking my phone. Emails, Slack, notifications—I'd fall into the reactive trap before my brain even had a chance to wake up.

Then I discovered the power of intentional mornings.

My new routine:
• 5 min: Journaling (3 things I'm grateful for)
• 10 min: Deep work on ONE priority
• 5 min: Review goals for the day

The results? I went from feeling overwhelmed to feeling in control.

The key insight: Your morning sets the tone for your entire day.

What does your morning routine look like? 👇`,
      cta: "What's your morning non-negotiable? Share below.",
    },
    "2": {
      hook: "I asked 50 successful founders about their biggest regret.",
      body: `The answers surprised me.

Not one of them said "I wish I'd worked more hours."

Instead, the most common regret was this:

"I wish I'd started delegating sooner."

They all had the same pattern:
→ Initially tried to do everything themselves
→ Burned out
→ Finally learned to let go
→ Their businesses scaled

The irony? They thought delegation was a sign of weakness.

It turned out to be the key to growth.

Here's what I learned: Your job as a founder isn't to do the work—it's to build systems and people who can do the work better than you.

What's holding you back from delegating?`,
      cta: "Drop a 👋 if you're ready to let go of control.",
    },
    "3": {
      hook: "The LinkedIn strategy that got me 10,000 followers in 90 days.",
      body: `It wasn't posting every day.

It wasn't engagement pods.

It wasn't chasing trends.

It was something much simpler: Be genuinely helpful.

Here's the framework that worked:

1. Pick ONE topic you're uniquely qualified to talk about
2. Write for ONE specific person (your ideal follower)
3. Ask one question at the end
4. Respond to every comment in the first hour

The math is brutal but simple:
→ 100 useful posts > 1,000 mediocre ones
→ 1 genuine connection > 100 superficial follows

Quality compounds. Always.

What's your content philosophy?`,
      cta: "Save this post for when you need a content refresh.",
    },
  };

  const selectedPost = samplePosts[ideaId || "1"] || samplePosts["1"];

  const draft: DraftPost = {
    id: `draft-${Date.now()}`,
    ideaId: ideaId || "unknown",
    content: `${selectedPost.hook}\n\n${selectedPost.body}\n\n${selectedPost.cta}`,
    hook: selectedPost.hook,
    body: selectedPost.body,
    callToAction: selectedPost.cta,
    hashtags: [
      topic ? `#${topic.replace(/\s+/g, "")}` : "#ProfessionalDevelopment",
      "#ProductivityTips",
      "#CareerGrowth",
    ],
    estimatedReadTime: Math.ceil(targetLength / 200),
    tone,
    status: "draft",
    createdAt: new Date().toISOString(),
    wordCount: selectedPost.body.split(/\s+/).length,
  };

  return {
    success: true,
    draft,
  };
});
