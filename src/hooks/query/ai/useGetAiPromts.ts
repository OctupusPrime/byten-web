import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { aiItem } from "types/data/ai";
import { type QueryOptions } from "types/queryHooks";

export type AiPromtsData = aiItem[];

export const reqAiPromts = async () => {
  const { data } = await axiosInstance.get<AiPromtsData>("test");

  return data;
};

export default function useGetAiPromts(
  options?: QueryOptions<["ai", "promts"], AiPromtsData>
) {
  return useQuery({
    queryKey: ["ai", "promts"],
    queryFn: reqAiPromts,
    ...options,
  });
}
