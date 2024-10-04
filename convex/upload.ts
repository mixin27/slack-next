import { mutation } from "./_generated/server";

export const generatedUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
