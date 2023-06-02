import { Route, useNavigate, useParams } from "@tanstack/router";
import { appRoute } from "../";

import { z } from "zod";
import { useMemo } from "react";
import { notifications } from "@mantine/notifications";

import { ActionIcon } from "@mantine/core";
import Icon from "@components/Icon";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { NoteItemLoader } from "@features/notes";

import useGetNoteById from "@hooks/query/notes/useGetNoteById";
import parseNotesFromApi from "@utils/parseNotesFromApi";

export const appNoteRoute = new Route({
  getParentRoute: () => appRoute,
  path: "note/$id",
  parseParams: (params) => ({
    id: z.string().parse(params.id),
  }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: Note,
});

function Note() {
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

  const parsedData = useMemo(() => {
    if (!data) return undefined;

    return parseNotesFromApi(data);
  }, [data]);

  const navigateToEdit = () => {
    if (!params.id) return;

    navigate({
      to: "/app/note-edit/$id",
      params: {
        id: params.id,
      },
    });
  };

  return (
    <section className="w-full">
      <div className="sticky top-0 -mt-2 flex justify-between bg-white py-2 dark:bg-neutral-900">
        <ActionIcon size="lg" variant="light" onClick={navigateBack}>
          <Icon
            name="arrow_back"
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </ActionIcon>
        <ActionIcon
          size="lg"
          variant="light"
          disabled={!parsedData}
          onClick={navigateToEdit}
        >
          <Icon
            name="draw"
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </ActionIcon>
      </div>
      {parsedData ? (
        <>
          <h2 className="my-2 text-xl font-medium dark:text-white">
            {parsedData.title}
          </h2>
          <div className="mb-4 flex justify-between">
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400">Created at</p>
              <p className="font-medium dark:text-white">
                {parsedData.createdAt.format("MMM DD, YYYY")}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-gray-600 dark:text-gray-400">Updated at</p>
              <p className="font-medium dark:text-white">
                {parsedData.updatedAt.format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
          {parsedData.body ? (
            <MarkdownPreview source={parsedData.body} />
          ) : null}
        </>
      ) : (
        <NoteItemLoader />
      )}
    </section>
  );
}
