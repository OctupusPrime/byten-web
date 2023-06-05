import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { aiItem } from "types/data/ai";
import { type QueryOptions } from "types/queryHooks";

import { notifications } from "@mantine/notifications";

export type ModifyPromptsData = aiItem[];

export const reqModifyPrompts = async () => {
  const { data } = await axiosInstance.get<ModifyPromptsData>(
    "ai-prompts?type=modify"
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
    onError: (err) => {
      notifications.show({
        title: "Cannot load modify prompts",
        message: "Try again later",
        color: "red",
      });

      options?.onError?.(err);
    },
  });
}
