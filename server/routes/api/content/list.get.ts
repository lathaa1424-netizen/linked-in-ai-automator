import { defineHandler } from "nitro";
import { getQuery } from "nitro/h3";

interface ContentItem {
  id: string;
  type: "idea" | "draft" | "published";
  topic: string;
  status: string;
  engagement?: {
    impressions: number;
    clicks: number;
    comments: number;
    likes: number;
  };
  createdAt: string;
  publishedAt?: string;
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "published",
    topic: "The 5-minute morning routine that transformed my productivity",
    status: "published",
    engagement: { impressions: 12450, clicks: 892, comments: 47, likes: 234 },
    createdAt: "2024-01-15T09:00:00Z",
    publishedAt: "2024-01-15T09:30:00Z",
  },
  {
    id: "2",
    type: "published",
    topic: "I asked 50 successful founders about their biggest regret",
    status: "published",
    engagement: { impressions: 18200, clicks: 1456, comments: 89, likes: 412 },
    createdAt: "2024-01-12T14:00:00Z",
    publishedAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "3",
    type: "draft",
    topic: "The LinkedIn strategy that got me 10,000 followers",
    status: "review",
    createdAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "4",
    type: "idea",
    topic: "Why I stopped using productivity apps",
    status: "approved",
    createdAt: "2024-01-17T16:00:00Z",
  },
  {
    id: "5",
    type: "idea",
    topic: "Lessons from scaling a team from 5 to 50",
    status: "generated",
    createdAt: "2024-01-18T08:00:00Z",
  },
];

export default defineHandler(async (event) => {
  const query = getQuery(event);
  const { type, status, limit = 20, offset = 0 } = query;

  let filteredContent = [...mockContent];

  if (type && type !== "all") {
    filteredContent = filteredContent.filter(item => item.type === type);
  }

  if (status) {
    filteredContent = filteredContent.filter(item => item.status === status);
  }

  const paginatedContent = filteredContent.slice(Number(offset), Number(offset) + Number(limit));

  return {
    success: true,
    content: paginatedContent,
    total: filteredContent.length,
    hasMore: Number(offset) + paginatedContent.length < filteredContent.length,
  };
});
