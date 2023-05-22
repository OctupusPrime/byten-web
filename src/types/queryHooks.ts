import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type QueryOptions<T extends QueryKey, TData = unknown> = Omit<
  UseQueryOptions<unknown, unknown, TData, T>,
  "initialData" | "queryKey" | "queryFn"
>;
