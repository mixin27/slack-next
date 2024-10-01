import { getAuthSessionId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) {
      return null;
    }
    const session = await ctx.db.get(sessionId);
    if (session === null) {
      return null;
    }

    return await ctx.db.get(session.userId);
  },
});
