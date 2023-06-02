import axiosInstance from "@lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import parseNotesFromApi from "@utils/parseNotesFromApi";
import type { NoteItem, NoteItemApi } from "types/data/notes";

const reqUpdateNote = async (
  item: Omit<NoteItem, "createdAt" | "updatedAt">
) => {
  const { data } = await axiosInstance.put<NoteItemApi>("notes", item);

  return parseNotesFromApi(data);
};

export default function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reqUpdateNote,
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      await queryClient.cancelQueries({ queryKey: ["note", item.id] });

      const previusData: NoteItemApi | undefined = queryClient.getQueryData([
        "note",
        item.id,
      ]);

      const previusArrData = queryClient.getQueryData(["notes"]);

      if (!previusData) {
        return undefined;
      }

      const updatedItem = {
        ...previusData,
        ...item,
      };

      queryClient.setQueryData<NoteItemApi[]>(["notes"], (old) =>
        old?.map((el) => {
          if (el.id === updatedItem.id) {
            return updatedItem;
          }
          return el;
        })
      );

      queryClient.setQueryData(["note", item.id], () => updatedItem);

      return { previusData, previusArrData };
    },
    onError: (_err, _item, context) => {
      if (!context) return;

      queryClient.setQueryData(["notes"], context.previusArrData);
      queryClient.setQueryData(
        ["note", context.previusData.id],
        context.previusData
      );
    },
    onSettled(_data, _error, _variables, context) {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({
        queryKey: ["note", context.previusData.id],
      });
    },
    retry: 3,
  });
}
