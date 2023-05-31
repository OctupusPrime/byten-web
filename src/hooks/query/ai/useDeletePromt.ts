import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { aiItem } from "types/data/ai";

const reqDeletePromt = async (item: aiItem) => {
  const { data } = await axiosInstance.get<aiItem>("test");

  return data;
};

export default function useDeletePromt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqDeletePromt,
    onMutate: async (item) => {
      const queryKey =
        item.type === "modify" ? ["ai", "text-modify"] : ["ai", "promts"];

      return { queryKey };
    },
    onSettled(_data, _error, _variables, context) {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
