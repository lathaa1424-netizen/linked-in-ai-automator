import { defineHandler } from "nitro";
import { posts } from "../../../src/lib/data";

export default defineHandler(async () => {
  return {
    success: true,
    posts,
    meta: {
      total: posts.length,
      byStatus: {
        idea: posts.filter(p => p.status === "idea").length,
        drafting: posts.filter(p => p.status === "drafting").length,
        review: posts.filter(p => p.status === "review").length,
        scheduled: posts.filter(p => p.status === "scheduled").length,
        published: posts.filter(p => p.status === "published").length,
        rejected: posts.filter(p => p.status === "rejected").length,
      },
    },
  };
});
