import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

export function useCollections(storeId: Id<"stores"> | undefined) {
  return useQuery(api.collections.list, storeId ? { storeId } : "skip") ?? [];
}