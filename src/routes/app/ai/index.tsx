import { Route, useNavigate, Outlet, useMatches } from "@tanstack/router";
import { appRoute } from "../";
import {
  AiItemCreateOrEditModal,
  AiItemDeleteModal,
  StyledTabs,
  useCreateOrEditAiItemModalStore,
  useDeleteAiItemModalStore,
} from "@features/ai";
import { Button, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";

import { reqAiPrompts } from "@hooks/query/ai/useGetAiPrompts";
import { reqModifyPrompts } from "@hooks/query/ai/useGetModifyPrompts";

export const appAiRoute = new Route({
  getParentRoute: () => appRoute,
  loader: ({ context }) => {
    // context.queryClient.ensureQueryData({
    //   queryKey: ["ai", "prompt"],
    //   queryFn: reqAiPrompts,
    // });
    // context.queryClient.ensureQueryData({
    //   queryKey: ["ai", "text-modify"],
    //   queryFn: reqModifyPrompts,
    // });
  },
  path: "ai",
  component: Ai,
});

function Ai() {
  const matches = useMatches();
  const navigate = useNavigate();

  const [tabState, setTabState] = useState(matches[1].id);

  useEffect(() => {
    setTabState(matches[1].id);
  }, [matches]);

  const handleTabChange = (value: string) => {
    navigate({
      to: value as any,
      from: tabState as any,
    });
  };

  const openCreateAiItemModal = useCreateOrEditAiItemModalStore(
    (state) => state.openModal
  );

  const handleCreateClick = () => {
    return openCreateAiItemModal(
      undefined,
      tabState === "/app/ai/prompts" ? "prompt" : "modify"
    );
  };

  return (
    <section className="w-full">
      <h1 className="my-2 text-center text-2xl font-semibold dark:text-white">
        Ai
      </h1>

      <StyledTabs
        classNames={{
          tabsList: "!justify-center",
          root: "!sticky !top-0 !py-2 !bg-white dark:!bg-neutral-900",
        }}
        value={tabState}
        onTabChange={handleTabChange}
      >
        <Tabs.List>
          <Tabs.Tab value="/app/ai/">Text Modification</Tabs.Tab>
          <Tabs.Tab value="/app/ai/prompts">AI Prompts</Tabs.Tab>
        </Tabs.List>
      </StyledTabs>
      <Outlet />
      <div className="sticky bottom-0 mt-3 bg-gradient-to-t from-white to-transparent text-center dark:from-neutral-900">
        <Button
          classNames={{
            root: "!my-2",
          }}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          onClick={handleCreateClick}
        >
          Create new
        </Button>
      </div>
      <AiPageModals />
    </section>
  );
}

function AiPageModals() {
  const { deleteState, isVisibleDelete, closeDeleteModal } =
    useDeleteAiItemModalStore((state) => ({
      deleteState: state.state,
      isVisibleDelete: state.isVisible,
      closeDeleteModal: state.closeModal,
    }));

  const { editState, createType, isVisibleEdit, isEditModal, closeEditModal } =
    useCreateOrEditAiItemModalStore((state) => ({
      editState: state.state,
      isVisibleEdit: state.isVisible,
      closeEditModal: state.closeModal,
      isEditModal: state.isEdit,
      createType: state.createType,
    }));

  return (
    <>
      <AiItemDeleteModal
        state={deleteState}
        opened={isVisibleDelete}
        onClose={closeDeleteModal}
      />
      <AiItemCreateOrEditModal
        state={editState}
        opened={isVisibleEdit}
        isEdit={isEditModal}
        onClose={closeEditModal}
        createType={createType}
      />
    </>
  );
}
