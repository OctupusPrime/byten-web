import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { aiItem } from "types/data/ai";

const reqDeletePrompt = async (item: aiItem) => {
  const { data } = await axiosInstance.delete<aiItem>(
    `ai-prompts/${item.id}?type=${item.type}`
  );

  return data;
};

export default function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqDeletePrompt,
    onMutate: async (item) => {
      const queryKey =
        item.type === "modify" ? ["ai", "text-modify"] : ["ai", "prompt"];

      return { queryKey };
    },
    onSuccess: (_data, item, context) => {
      if (!context) return;

      queryClient.setQueryData(context.queryKey, (old: any) =>
        old?.filter((el: aiItem) => el.id !== item.id)
      );
    },
    onError: (_error, _variables, context) => {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
