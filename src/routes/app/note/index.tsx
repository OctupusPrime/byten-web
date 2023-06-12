import { Route, useNavigate, useParams } from "@tanstack/router";
import { appRoute } from "../";

import { z } from "zod";
import { Suspense, lazy, useMemo } from "react";

import { ActionIcon, Skeleton } from "@mantine/core";
import Icon from "@components/Icon";

import useGetNoteById from "@hooks/query/notes/useGetNoteById";
import parseNotesFromApi from "@utils/parseNotesFromApi";

import MDPreviewLoader from "@components/Loaders/Markdown/Preview";

const MarkdownPreview = lazy(() => import("@uiw/react-markdown-preview"));

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
      <div className="sticky top-0 z-10 -mt-2 flex justify-between bg-white py-2 dark:bg-neutral-900">
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
            <div className="overflow-hidden">
              <Suspense fallback={<MDPreviewLoader />}>
                <MarkdownPreview source={parsedData.body} />
              </Suspense>
            </div>
          ) : null}
        </>
      ) : (
        <DataLoading />
      )}
    </section>
  );
}

function DataLoading() {
  return (
    <>
      <div className="mb-2 py-[5px]">
        <Skeleton height={16} width={"83%"} />
        <Skeleton height={16} width={"40%"} mt={13} />
      </div>
      <div className="mb-5 flex justify-between">
        <div className="text-sm">
          <p className="text-gray-600 dark:text-gray-400">Created at</p>
          <Skeleton height={14} width={85} my={3} />
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-600 dark:text-gray-400">Updated at</p>
          <Skeleton height={14} width={85} my={3} />
        </div>
      </div>
      <MDPreviewLoader />
    </>
  );
}
