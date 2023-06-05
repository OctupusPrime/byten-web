import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteItem, NoteItemApi } from "types/data/notes";

import { notifications } from "@mantine/notifications";

const reqDeleteNote = async (item: NoteItem) => {
  const { data } = await axiosInstance.delete<NoteItemApi>(`notes/${item.id}`);

  return data;
};

export default function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqDeleteNote,
    onSuccess: (_data, variables) => {
      queryClient.removeQueries({
        queryKey: ["note", variables.id],
      });
      queryClient.setQueryData(["notes"], (old: any) =>
        old?.filter((el: NoteItemApi) => el.id !== variables.id)
      );
    },
    onError: () => {
      notifications.show({
        title: "Cannot delete note",
        message: "Try again later",
        color: "red",
      });

      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
