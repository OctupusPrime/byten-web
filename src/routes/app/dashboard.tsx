import { useMemo, useState } from "react";
import { Route, useNavigate } from "@tanstack/router";
import { appRoute } from ".";

import Icon from "@components/Icon";
import {
  Button,
  LoadingOverlay,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  NoteListItem,
  NoteListItemLoader,
  useCreateNoteModalStore,
} from "@features/notes";

import useGetNotes from "@hooks/query/notes/useGetNotes";
import type { NoteItem } from "types/data/notes";

import parseNotesFromApi from "@utils/parseNotesFromApi";

import dayjs from "@lib/dayjs";
import CreateNoteModal from "@features/notes/components/CreateNoteModal";
import useCreateNote from "@hooks/query/notes/useCreateNote";
import { notifications } from "@mantine/notifications";

export const appDashboardRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();

  const { data, isSuccess } = useGetNotes();

  const todayDate = dayjs();

  const [newTodayNote] = useState({
    title: `${todayDate.format("MMMM D")} notes`,
    createdAt: todayDate.clone(),
  });

  const parsedData = useMemo(() => {
    const oddItems: NoteItem[] = [];
    const evenItems: NoteItem[] = [];

    const todayItems: NoteItem[] = [];

    let isItemsExist = false;

    let isTodayExist = false;

    if (!data)
      return {
        today: todayItems,
        odd: oddItems,
        even: evenItems,
        isItemsExist,
        isTodayExist,
        isSuccess: false,
      };

    for (var i = 0; i < data.length; i++) {
      const item = parseNotesFromApi(data[i]);

      if (item.createdAt.isToday()) {
        todayItems.push(item);
        isTodayExist = true;
      } else {
        if (i % 2 === 0) {
          evenItems.push(item);
          isItemsExist = true;
        } else {
          oddItems.push(item);
          isItemsExist = true;
        }
      }
    }

    return {
      today: todayItems,
      odd: oddItems,
      even: evenItems,
      isItemsExist,
      isTodayExist,
      isSuccess: true,
    };
  }, [data, isSuccess]);

  const handleOpenNote = (note: NoteItem) => {
    navigate({
      to: "/app/note/$id",
      params: {
        id: note.id,
      },
    });
  };

  const openCreateModal = useCreateNoteModalStore((state) => state.openModal);

  const { mutate, isLoading } = useCreateNote();

  const handleCreateTodayNote = () => {
    mutate(newTodayNote.title, {
      onSuccess: (data) => {
        handleOpenNote(data as any);
      },
      onError: () => {
        notifications.show({
          title: "Cannot create note",
          message: "Try again later",
          color: "red",
        });
      },
    });
  };

  return (
    <section className="w-full pb-10 sm:pb-0">
      <h1 className="my-3 text-3xl font-bold dark:text-white">Good day</h1>
      <div className="sticky top-0 mb-1 flex items-center gap-2 bg-white py-3 dark:bg-neutral-900">
        <TextInput
          placeholder="What you want search?"
          icon={<Icon name="search" size={16} />}
          className="!flex-1"
          disabled={!isSuccess}
        />
        <Button
          classNames={{
            root: "!my-2 sm:!block !hidden",
          }}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          disabled={!isSuccess}
          onClick={openCreateModal}
        >
          Create Note
        </Button>
      </div>
      {parsedData.isSuccess ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <h3 className="mb-2  font-medium text-gray-600 dark:text-gray-400">
              Today
            </h3>
            {parsedData.isTodayExist ? (
              <ul className="flex flex-col flex-wrap gap-3">
                {parsedData.today.map((el) => (
                  <NoteListItem
                    item={el}
                    key={el.id}
                    onClick={handleOpenNote}
                  />
                ))}
              </ul>
            ) : (
              <UnstyledButton
                className={"!relative !w-full"}
                onClick={handleCreateTodayNote}
                disabled={isLoading}
              >
                <div
                  className={`rounded bg-gray-50 px-3 py-2 dark:bg-neutral-800`}
                >
                  <LoadingOverlay visible={isLoading} />
                  <h3 className="break-words font-medium dark:text-white">
                    {newTodayNote.title}
                  </h3>

                  <p className="mt-2 text-right text-xs text-gray-600 dark:text-gray-400">
                    {newTodayNote.createdAt.format("MMM DD, YYYY")}
                  </p>
                </div>
              </UnstyledButton>
            )}

            {parsedData.isItemsExist ? (
              <h3 className="mt-3  font-medium text-gray-600 dark:text-gray-400">
                Previus
              </h3>
            ) : null}
          </div>

          {parsedData.even.length ? (
            <ul className="flex flex-col flex-wrap gap-3">
              {parsedData.even.map((el) => (
                <NoteListItem item={el} key={el.id} onClick={handleOpenNote} />
              ))}
            </ul>
          ) : null}

          {parsedData.odd.length ? (
            <ul className="flex flex-col flex-wrap gap-3">
              {parsedData.odd.map((el) => (
                <NoteListItem item={el} key={el.id} onClick={handleOpenNote} />
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <DataLoading />
      )}

      <div className="fixed inset-x-0 bottom-20 bg-gradient-to-t from-white to-transparent py-3 text-center dark:from-neutral-900 sm:hidden">
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          disabled={!isSuccess}
          onClick={openCreateModal}
        >
          Create Note
        </Button>
      </div>
      <NoteModals />
    </section>
  );
}

function NoteModals() {
  const navigate = useNavigate();

  const { isVisible, closeModal } = useCreateNoteModalStore((state) => ({
    isVisible: state.isVisible,
    closeModal: state.closeModal,
  }));

  return (
    <>
      <CreateNoteModal
        opened={isVisible}
        onClose={closeModal}
        onSuccess={(item) =>
          navigate({
            to: "/app/note/$id",
            params: {
              id: item.id,
            },
          })
        }
      />
    </>
  );
}

function DataLoading() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <h3 className="mb-2  font-medium text-gray-600 dark:text-gray-400">
          Today
        </h3>
        <NoteListItemLoader items={["80%", "35%"]} />
        <h3 className="mt-3  font-medium text-gray-600 dark:text-gray-400">
          Previus
        </h3>
      </div>
      <ul className="flex flex-col flex-wrap gap-3">
        <NoteListItemLoader items={["67%", "45%"]} />
        <NoteListItemLoader items={["70%"]} />
      </ul>
      <ul className="flex flex-col flex-wrap gap-3">
        <NoteListItemLoader items={["100%", "30%", "50%"]} />
      </ul>
    </div>
  );
}
