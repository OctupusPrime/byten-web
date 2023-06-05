import type { Dayjs } from "dayjs";

export type NoteItem = {
  id: string;
  title: string;
  body?: string;
  color: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export type NoteItemApi = {
  id: string;
  title: string;
  body?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};
