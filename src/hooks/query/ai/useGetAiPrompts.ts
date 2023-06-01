import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { aiItem } from "types/data/ai";
import { type QueryOptions } from "types/queryHooks";

export type AiPromptsData = aiItem[];

export const reqAiPrompts = async () => {
  const { data } = await axiosInstance.get<AiPromptsData>("ai-prompts/prompt");

  return data;
};

export default function useGetAiPrompts(
  options?: QueryOptions<["ai", "prompt"], AiPromptsData>
) {
  return useQuery({
    queryKey: ["ai", "prompt"],
    queryFn: reqAiPrompts,
    ...options,
  });
}
