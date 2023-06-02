import { Route, useNavigate, useParams } from "@tanstack/router";
import { appRoute } from ".";
import useGetNoteById from "@hooks/query/notes/useGetNoteById";
import { z } from "zod";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { ActionIcon } from "@mantine/core";
import Icon from "@components/Icon";

import MarkdownPreview from "@uiw/react-markdown-preview";

const testData = `1. ewqweq
2. ewqeqweqw
3. ewqeqwe
4. qwe
5. qw
6. eqw
7. eq
8. e
9. qweqweqw`;

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

  const { data } = useGetNoteById(params.id + "", {
    onError: () => {
      notifications.show({
        title: "Cannot load note",
        message: "Try again later",
        color: "red",
      });
      navigate({
        to: "/app",
      });
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="w-full">
      <div className="sticky top-0 -mt-2 flex justify-between bg-white py-2 dark:bg-neutral-900">
        <ActionIcon size="lg" variant="light">
          <Icon name="arrow_back" size={16} />
        </ActionIcon>
        <ActionIcon size="lg" variant="light">
          <Icon name="draw" size={16} />
        </ActionIcon>
      </div>
      <h2 className="my-2 text-xl font-medium dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quo,
        facilis vitae beatae aspernatur necessitatibus?
      </h2>
      <div className="mb-4 flex justify-between">
        <div className="text-sm">
          <p className="text-gray-600 dark:text-gray-400">Created at</p>
          <p className="font-medium dark:text-white">Jun 01, 2023</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-600 dark:text-gray-400">Updated at</p>
          <p className="font-medium dark:text-white">Jun 01, 2023</p>
        </div>
      </div>
      <MarkdownPreview source={testData} />
    </section>
  );
}
