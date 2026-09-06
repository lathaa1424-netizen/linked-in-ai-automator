import { defineHandler } from "nitro";
import { agents } from "../../../src/lib/data";

export default defineHandler(async (event) => {
  return {
    success: true,
    agents,
    meta: {
      total: agents.length,
      online: agents.filter(a => a.status !== "idle" && a.status !== "error").length,
      timestamp: new Date().toISOString(),
    },
  };
});
