import axiosInstance from "@lib/axios";
import { useMutation } from "@tanstack/react-query";

import { notifications } from "@mantine/notifications";

const reqAutoComplete = async () => {
  const { data } = await axiosInstance.post("/ai-auto-complete");

  return data;
};

export default function useAiAutoComplete() {
  return useMutation({
    mutationFn: reqAutoComplete,
    onSuccess: (data) => {
      console.log("ai-response", data);
    },
    onError: () => {
      notifications.show({
        title: "Cannot get responce from chatgpt",
        message: "Try again later",
        color: "red",
      });
    },
  });
}
