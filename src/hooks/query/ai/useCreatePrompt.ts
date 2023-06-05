import axiosInstance from "@lib/axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { aiItem } from "types/data/ai";

import { notifications } from "@mantine/notifications";

const reqCreatePrompt = async (item: Omit<aiItem, "id">) => {
  const { data } = await axiosInstance.post<aiItem>("ai-prompts/create", item);

  return data;
};

export default function useCreatePrompt() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: reqCreatePrompt,
    onMutate: async (item) => {
      const queryKey =
        item.type === "modify" ? ["ai", "text-modify"] : ["ai", "prompt"];

      return { queryKey };
    },
    onError: () => {
      notifications.show({
        title: "Cannot create prompt",
        message: t("navbar.links.dashboard"),
        color: "red",
      });
    },
    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
  });
}
