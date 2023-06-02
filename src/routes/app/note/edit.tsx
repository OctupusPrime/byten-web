import { Route, useNavigate, useParams } from "@tanstack/router";
import { appRoute } from "../";

import { z } from "zod";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

import { ActionIcon } from "@mantine/core";
import Icon from "@components/Icon";

import useGetNoteById from "@hooks/query/notes/useGetNoteById";
import parseNotesFromApi from "@utils/parseNotesFromApi";
import { NoteItem } from "types/data/notes";
import TextareaAutosize from "react-textarea-autosize";

import MDEditor from "@components/MDEditor";

export const appEditNoteRoute = new Route({
  getParentRoute: () => appRoute,
  path: "note-edit/$id",
  parseParams: (params) => ({
    id: z.string().parse(params.id),
  }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: EditNote,
});

function EditNote() {
  const navigate = useNavigate();
  const params = useParams();

  const navigateBack = () => {
    navigate({
      to: "/app",
    });
  };

  const { data } = useGetNoteById(params.id + "", {
    onError: () => {
      notifications.show({
        title: "Cannot load note",
        message: "Try again later",
        color: "red",
      });
      navigateBack();
    },
  });

  const [parsedData, setParsedData] = useState<NoteItem>();

  const [mdTest, setMdTest] = useState(``);

  useEffect(() => {
    if (parsedData || !data) return;

    setParsedData(parseNotesFromApi(data));
  }, [data]);

  return (
    <section className="flex w-full flex-col">
      <div className="sticky top-0 z-10 -mt-2 flex justify-between bg-white py-2 dark:bg-neutral-900">
        <ActionIcon size="lg" variant="light" onClick={navigateBack}>
          <Icon
            name="arrow_back"
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </ActionIcon>
        <ActionIcon size="lg" variant="light" disabled={!parsedData}>
          <Icon
            name="delete"
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </ActionIcon>
      </div>
      <TextareaAutosize
        className="my-2 w-full resize-none px-1 text-xl font-medium outline-none"
        placeholder="Title"
      />
      <MDEditor
        preview="edit"
        value={mdTest}
        onChange={(val) => setMdTest(val ?? "")}
        toolbarClassName="top-[50px]"
        className="px-1"
      />
    </section>
  );
}
