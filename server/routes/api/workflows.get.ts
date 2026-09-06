import { defineHandler } from "nitro";
import { workflows } from "../../../src/lib/data";

export default defineHandler(async () => {
  return {
    success: true,
    workflows,
    meta: {
      total: workflows.length,
      active: workflows.filter(w => w.status === "active").length,
      paused: workflows.filter(w => w.status === "paused").length,
    },
  };
});
