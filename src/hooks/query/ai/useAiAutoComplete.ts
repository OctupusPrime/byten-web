import axiosInstance from "@lib/axios";
import { useMutation } from "@tanstack/react-query";

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
  });
}
