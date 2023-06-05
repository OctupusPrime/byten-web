import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteItemApi } from "types/data/notes";

import { notifications } from "@mantine/notifications";

const reqCreateNote = async (title: string) => {
  const { data } = await axiosInstance.post<NoteItemApi>("notes", {
    title,
  });

  return data;
};

export default function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqCreateNote,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", data.id], () => data);
    },
    onError: () => {
      notifications.show({
        title: "Cannot create note",
        message: "Try again later",
        color: "red",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
