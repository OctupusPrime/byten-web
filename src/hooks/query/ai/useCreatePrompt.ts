import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { aiItem } from "types/data/ai";

const reqDeletePrompt = async (item: Omit<aiItem, "id">) => {
  const { data } = await axiosInstance.post<aiItem>("ai-prompts/create", item);

  return data;
};

export default function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqDeletePrompt,
    onMutate: async (item) => {
      const queryKey =
        item.type === "modify" ? ["ai", "text-modify"] : ["ai", "prompt"];

      return { queryKey };
    },
    onSettled(_data, _error, _variables, context) {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
