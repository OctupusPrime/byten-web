import axiosInstance from "@lib/axios";
import { useMutation } from "@tanstack/react-query";

import { notifications } from "@mantine/notifications";

import { type ChatGptResponse } from "types/data/chatGpt";

type ReqBody = { state?: string; prompt: string };

const reqAutoComplete = async (body: ReqBody) => {
  const { data } = await axiosInstance.post<ChatGptResponse>(
    "/ai-auto-complete",
    body
  );

  return data;
};

export default function useAiAutoComplete() {
  return useMutation({
    mutationFn: reqAutoComplete,
    onError: () => {
      notifications.show({
        title: "Cannot get responce from chatgpt",
        message: "Try again later",
        color: "red",
      });
    },
  });
}
