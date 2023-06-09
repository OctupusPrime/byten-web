import axiosInstance from "@lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { type NoteItemApi } from "types/data/notes";
import { type QueryOptions } from "types/queryHooks";

import { notifications } from "@mantine/notifications";

export const reqNotes = async (id: string) => {
  const { data } = await axiosInstance.get<NoteItemApi>(`notes/${id}`);

  return data;
};

export default function useGetNoteById(
  id: string,
  options?: QueryOptions<["note", any], NoteItemApi>
) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["note", id],
    queryFn: () => reqNotes(id),
    initialData: () =>
      (queryClient.getQueryData(["notes"]) as NoteItemApi[] | undefined)?.find(
        (el) => el.id === id
      ),
    ...options,
    onError: (err) => {
      notifications.show({
        title: "Cannot load note",
        message: "Try again later",
        color: "red",
      });

      options?.onError?.(err);
    },
  });
}
