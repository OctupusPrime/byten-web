import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Route, useNavigate, useParams } from "@tanstack/router";
import { appRoute } from "../";

import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { useSetState } from "@mantine/hooks";
import type { NoteItem } from "types/data/notes";

import { ActionIcon, Skeleton } from "@mantine/core";
import Icon from "@components/Icon";
import TextareaAutosize from "react-textarea-autosize";
import MdEditorLoader from "@components/Loaders/Markdown/Editor";
import { NoteDeleteModal, useDeleteNoteModalStore } from "@features/notes";

import useGetNoteById from "@hooks/query/notes/useGetNoteById";
import useUpdateNote from "@hooks/query/notes/useUpdateNote";
import parseNotesFromApi from "@utils/parseNotesFromApi";
import useDebounceCallback from "@hooks/useDebounceCallBack";

const MDEditor = lazy(() => import("@components/MDEditor"));

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
    if (!params.id)
      return navigate({
        to: "/app",
      });
    navigate({
      to: "/app/note/$id",
      params: { id: params.id },
    });
  };

  const { data, isSuccess } = useGetNoteById(params.id + "", {
    onError: () => {
      notifications.show({
        title: "Cannot load note",
        message: "Try again later",
        color: "red",
      });
      navigateBack();
    },
  });

  const [parsedData, setParsedData] = useSetState<NoteItem>({} as NoteItem);

  useDebounceCallback<NoteItem>(
    parsedData,
    (data) => console.log("update", data),
    1000
  );

  useEffect(() => {
    if (parsedData.title || !data) return;

    setParsedData(parseNotesFromApi(data));
  }, [data]);

  const openDeleleConformation = useDeleteNoteModalStore(
    (state) => state.openModal
  );

  const handleOpenDelete = () => {
    if (!isSuccess) return;

    openDeleleConformation(parsedData);
  };

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
        <ActionIcon
          size="lg"
          variant="light"
          disabled={!isSuccess}
          onClick={handleOpenDelete}
        >
          <Icon
            name="delete"
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </ActionIcon>
      </div>
      {isSuccess ? (
        <>
          <TextareaAutosize
            value={parsedData.title}
            onChange={(e) => setParsedData({ title: e.target.value })}
            className="my-2 w-full resize-none bg-transparent px-1 text-xl font-medium outline-none dark:text-white"
            placeholder="Title"
          />
          <Suspense fallback={<MdEditorLoader />}>
            <MDEditor
              value={parsedData.body ?? ""}
              onChange={(val) => setParsedData({ body: val })}
              toolbarClassName="top-[50px]"
            />
          </Suspense>
        </>
      ) : (
        <DataLoading />
      )}
      <NotePageModals />
    </section>
  );
}

function NotePageModals() {
  const navigate = useNavigate();

  const { deleteState, isVisibleDelete, closeDeleteModal } =
    useDeleteNoteModalStore((state) => ({
      deleteState: state.state,
      isVisibleDelete: state.isVisible,
      closeDeleteModal: state.closeModal,
    }));

  return (
    <NoteDeleteModal
      state={deleteState}
      opened={isVisibleDelete}
      onClose={closeDeleteModal}
      onSuccess={() => {
        navigate({
          to: "/app",
        });
      }}
    />
  );
}

function DataLoading() {
  return (
    <>
      <div className="mb-2 py-[5px]">
        <Skeleton height={16} width={"83%"} />
        <Skeleton height={16} width={"40%"} mt={13} />
      </div>
      <MdEditorLoader />
    </>
  );
}
