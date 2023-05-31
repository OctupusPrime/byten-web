import { Route } from "@tanstack/router";
import { appAiRoute } from ".";
import {
  AiListItem,
  AiListItemLoader,
  useCreateOrEditAiItemModalStore,
  useDeleteAiItemModalStore,
} from "@features/ai";
import { Button } from "@mantine/core";

export const appAiTextModifyRoute = new Route({
  getParentRoute: () => appAiRoute,
  path: "/",
  component: TextModify,
});

function TextModify() {
  const openDeleleConformation = useDeleteAiItemModalStore(
    (state) => state.openModal
  );

  const openEditModal = useCreateOrEditAiItemModalStore(
    (state) => state.openModal
  );

  const handleDelete = () => {
    openDeleleConformation({
      command: "ewqewq",
      id: 231,
      title: "test",
      type: "modify",
    });
  };

  const handleEdit = () => {
    openEditModal();
  };

  return (
    <>
      <div className="mt-3">
        <ul className="space-y-2">
          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          <AiListItem
            title="Test"
            command="teewrerewrre\newqeeqweqwewqeqweqeqwewqeqwewqewqewqewqewq"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </ul>

        {/* <div className="mt-3">
          <AiListItemLoader />
        </div> */}
      </div>
    </>
  );
}
