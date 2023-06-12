import axiosInstance from "@lib/axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import parseNotesFromApi from "@utils/parseNotesFromApi";
import type { Dayjs } from "dayjs";
import type { NoteItemApi } from "types/data/notes";

import { notifications } from "@mantine/notifications";

type NoteItemReq = {
  id: string;
  title: string;
  body?: string;
  color: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
};

const reqUpdateNote = async (item: NoteItemReq) => {
  delete item.createdAt;
  delete item.updatedAt;

  const { data } = await axiosInstance.put<NoteItemApi>("notes", item);

  return parseNotesFromApi(data);
};

export default function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqData: NoteItemReq) => {
      const noteData = queryClient.getQueryData(["note", reqData.id]);

      if (!noteData) return new Promise(() => undefined);

      return reqUpdateNote(reqData);
    },
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
        createdAt: previusData.createdAt,
        updatedAt: previusData.updatedAt,
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
      notifications.show({
        title: "Cannot update note",
        message: "Try again later",
        color: "red",
      });

      if (!context) return;

      queryClient.setQueryData(["notes"], context.previusArrData);
      queryClient.setQueryData(
        ["note", context.previusData.id],
        context.previusData
      );
    },
    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;

      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({
        queryKey: ["note", context.previusData.id],
      });
    },
  });
}
