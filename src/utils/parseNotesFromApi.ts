import type { NoteItem, NoteItemApi } from "types/data/notes";

import dayjs from "@lib/dayjs";

const parseNotesFromApi = (data: NoteItemApi): NoteItem => {
  return {
    id: data.id,
    title: data.title,
    body: data.body,
    color: data.color,
    createdAt: dayjs(data.createdAt),
    updatedAt: dayjs(data.updatedAt),
  };
};

export default parseNotesFromApi;
