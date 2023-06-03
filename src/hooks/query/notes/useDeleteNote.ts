import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { NoteItem, NoteItemApi } from "types/data/notes";
import { reqNotes } from "./useGetNotes";

const reqDeleteNote = async (item: NoteItem) => {
  const { data } = await axiosInstance.delete<NoteItemApi>(`notes/${item.id}`);

  return data;
};

export default function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqDeleteNote,
    onSuccess: async (_data, variables) => {
      queryClient.removeQueries({
        queryKey: ["note", variables.id],
      });
      await queryClient.fetchQuery({ queryKey: ["notes"], queryFn: reqNotes });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
