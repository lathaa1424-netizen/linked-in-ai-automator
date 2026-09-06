import { defineHandler } from "nitro";
import { readBody } from "nitro/h3";

interface ContentIdea {
  id: string;
  topic: string;
  angle: string;
  hooks: string[];
  targetAudience: string;
  estimatedEngagement: "low" | "medium" | "high";
  status: "generated" | "approved" | "drafted" | "published";
  createdAt: string;
}

const mockIdeas: ContentIdea[] = [
  {
    id: "1",
    topic: "AI in Marketing",
    angle: "Practical tips for beginners",
    hooks: [
      "Stop wasting time on manual tasks",
      "Here's what nobody tells you about AI",
      "The 5-minute AI workflow that changed everything",
    ],
    targetAudience: "Marketing professionals",
    estimatedEngagement: "high",
    status: "generated",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    topic: "Remote Work Productivity",
    angle: "Data-driven insights",
    hooks: [
      "The research behind async communication",
      "Why your meetings are killing productivity",
      "Numbers don't lie about remote work",
    ],
    targetAudience: "Remote team leaders",
    estimatedEngagement: "medium",
    status: "generated",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    topic: "Startup Growth",
    angle: "Lessons from failures",
    hooks: [
      "What I learned after 3 failed startups",
      "The metrics that actually matter",
      "Don't make this mistake I did",
    ],
    targetAudience: "Founders and early-stage entrepreneurs",
    estimatedEngagement: "high",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
];

export default defineHandler(async (event) => {
  const body = await readBody<{ topic?: string; niche?: string; count?: number }>(event);
  const { topic, niche, count = 5 } = body;

  // Simulate AI content ideation
  const newIdeas: ContentIdea[] = [];
  const topics = topic ? [topic] : [
    "Productivity Hacks",
    "Leadership Lessons",
    "Career Growth",
    "Tech Trends",
    "Industry Insights",
  ];
  
  const angles = [
    "Actionable advice",
    "Contrarian take",
    "Personal story",
    "Data-driven analysis",
    "Expert interview format",
  ];

  const hooks = [
    "The truth about {topic}",
    "Stop doing {topic} wrong",
    "What {topic} taught me about success",
    "Here's why {topic} matters more than you think",
    "The {topic} mistake everyone makes",
  ];

  for (let i = 0; i < count; i++) {
    const selectedTopic = topics[i % topics.length];
    const selectedAngle = angles[i % angles.length];
    const selectedHook = hooks[i % hooks.length];
    
    newIdeas.push({
      id: `idea-${Date.now()}-${i}`,
      topic: selectedTopic,
      angle: selectedAngle,
      hooks: [
        selectedHook.replace("{topic}", selectedTopic.toLowerCase()),
        `Why ${selectedTopic} will define 2024`,
        `The ${selectedTopic} guide you need`,
      ],
      targetAudience: niche || "Professionals in your industry",
      estimatedEngagement: ["low", "medium", "high"][i % 3] as "low" | "medium" | "high",
      status: "generated",
      createdAt: new Date().toISOString(),
    });
  }

  return {
    success: true,
    ideas: [...newIdeas, ...mockIdeas.slice(0, 2)],
  };
});
