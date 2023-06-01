import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { aiItem } from "types/data/ai";
import { type QueryOptions } from "types/queryHooks";

export type ModifyPromptsData = aiItem[];

export const reqModifyPrompts = async () => {
  const { data } = await axiosInstance.get<ModifyPromptsData>(
    "ai-prompts/modify"
  );

  return data;
};

export default function useGetModifyPrompts(
  options?: QueryOptions<["ai", "text-modify"], ModifyPromptsData>
) {
  return useQuery({
    queryKey: ["ai", "text-modify"],
    queryFn: reqModifyPrompts,
    ...options,
  });
}
