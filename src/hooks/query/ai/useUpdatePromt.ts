import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { aiItem } from "types/data/ai";

const reqUpdatePromt = async (item: aiItem) => {
  const { data } = await axiosInstance.get<aiItem>("test");

  return data;
};

export default function useUpdatePromt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqUpdatePromt,
    onMutate: async (item) => {
      const queryKey =
        item.type === "modify" ? ["ai", "text-modify"] : ["ai", "promts"];

      await queryClient.cancelQueries({ queryKey });

      const previusData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<aiItem[]>(queryKey, (old) =>
        old?.map((el) => {
          if (el.id === item.id) return { ...item };
          return el;
        })
      );

      return { previusData, queryKey };
    },
    onError: (_err, _item, context) => {
      if (!context) return;

      queryClient.setQueriesData(context.queryKey, context.previusData);
    },
    onSettled(_data, _error, _variables, context) {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
