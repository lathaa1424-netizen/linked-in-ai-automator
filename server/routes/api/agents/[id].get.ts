import { defineHandler } from "nitro";
import { getRouterParam } from "nitro/h3";
import { agents } from "../../../../src/lib/data";

export default defineHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const agent = agents.find(a => a.id === id);

  if (!agent) {
    return {
      success: false,
      error: "Agent not found",
    };
  }

  return {
    success: true,
    agent,
  };
});
