import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

export function useStore() {
  return useQuery(api.stores.get);
}