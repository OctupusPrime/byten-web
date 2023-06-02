import axiosInstance from "@lib/axios";
import { useQuery } from "@tanstack/react-query";

import { NoteItemApi } from "types/data/notes";
import { type QueryOptions } from "types/queryHooks";

export type NotesData = NoteItemApi[];

export const reqNotes = async () => {
  const { data } = await axiosInstance.get<NotesData>("notes");

  return data;
};

export default function useGetNotes(
  options?: QueryOptions<["notes"], NotesData>
) {
  return useQuery({
    queryKey: ["notes"],
    queryFn: reqNotes,
    ...options,
  });
}
