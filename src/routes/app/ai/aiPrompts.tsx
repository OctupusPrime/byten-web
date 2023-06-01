import { Route } from "@tanstack/router";
import { appAiRoute } from ".";
import useGetAiPrompts from "@hooks/query/ai/useGetAiPrompts";
import {
  AiListItem,
  AiListItemLoader,
  useCreateOrEditAiItemModalStore,
  useDeleteAiItemModalStore,
} from "@features/ai";
import type { aiItem } from "types/data/ai";

export const appAiPromptsRoute = new Route({
  getParentRoute: () => appAiRoute,
  path: "/prompts",
  component: AiPromts,
});

function AiPromts() {
  const { data, isSuccess } = useGetAiPrompts({});

  const openDeleleConformation = useDeleteAiItemModalStore(
    (state) => state.openModal
  );

  const openEditModal = useCreateOrEditAiItemModalStore(
    (state) => state.openModal
  );

  const handleDelete = (item: aiItem) => {
    openDeleleConformation(item);
  };

  const handleEdit = (item: aiItem) => {
    openEditModal(item);
  };

  return (
    <>
      <div className="mt-3">
        <ul className="space-y-3">
          {!isSuccess ? (
            <>
              <AiListItemLoader />
              <AiListItemLoader />
            </>
          ) : (
            data.map((item) => (
              <AiListItem
                key={item.id}
                title={item.title}
                command={item.command}
                onDelete={() => handleDelete(item)}
                onEdit={() => handleEdit(item)}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
}
