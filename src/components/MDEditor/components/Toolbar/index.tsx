import { useContext, useMemo, useState } from "react";
import { type ContextStore, EditorContext } from "../../Context";
import * as commands from "../../commands";

import { useDisclosure } from "@mantine/hooks";

import Icon from "@components/Icon";
import { AiAutoCompleteModal } from "@features/ai";
import ToolBarBtn from "./ToolBarBtn";
import { Box, Button, Center, SegmentedControl, clsx } from "@mantine/core";

const NewToolBar = (props?: { className?: string }) => {
  const {
    commandOrchestrator,
    preview,
    dispatch,
    barPopup = {},
    textarea,
  } = useContext(EditorContext);

  const handleExecuteCommand = (command: commands.ICommand) => {
    if (!commandOrchestrator)
      return console.error("commandOrchestrator is not defiend");

    commandOrchestrator.executeCommand(command);
  };

  const handleViewChange = () => {
    if (!dispatch) return;
    const state: ContextStore = { barPopup: { ...barPopup } };
    if (preview === "edit") {
      state.preview = "preview";
    }
    if (preview === "preview") {
      state.preview = "edit";
    }

    if (Object.keys(state).length) {
      dispatch({ ...state });
    }
  };

  const isBtnDisabled = useMemo(() => {
    return preview === "preview" ? true : false;
  }, [preview]);

  const [opened, { open, close }] = useDisclosure(false);

  const [selectedText, setSelectedText] = useState<string | undefined>(
    undefined
  );

  const handleOpenAiModal = () => {
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    setSelectedText(selectedText ? selectedText : undefined);
    open();
  };

  const handleAiCommand = (value: string) => {
    const command = { ...commands.ai };

    command.value = value;

    handleExecuteCommand(command);
  };

  return (
    <>
      <div
        className={clsx(
          "md-toolbar-wrapper sticky top-0 z-10 flex flex-wrap gap-4 bg-white px-3 py-2.5 dark:bg-neutral-800",
          props?.className
        )}
      >
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn
            icon="format_bold"
            command={commands.bold}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_italic"
            command={commands.italic}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_strikethrough"
            command={commands.strikethrough}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="vertical_distribute"
            command={commands.hr}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />

          <ToolBarBtn
            icon="code"
            command={commands.code}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="add_link"
            command={commands.link}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn
            icon="format_h1"
            command={commands.title1}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_h2"
            command={commands.title2}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_h3"
            command={commands.title3}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_h4"
            command={commands.title4}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn
            icon="format_quote"
            command={commands.quote}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="frame_source"
            command={commands.codeBlock}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="image"
            command={commands.image}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
        </div>
        <div className="flex items-center divide-x divide-gray-200 [&>:first-child]:rounded-l-sm [&>:first-child]:border-l [&>:last-child]:rounded-r-sm [&>:last-child]:!border-r">
          <ToolBarBtn
            icon="list"
            command={commands.unorderedListCommand}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="format_list_numbered"
            command={commands.orderedListCommand}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
          <ToolBarBtn
            icon="checklist"
            command={commands.checkedListCommand}
            onClick={handleExecuteCommand}
            disabled={isBtnDisabled}
          />
        </div>
        <div className="mx-auto inline-flex items-center gap-4 sm:ml-auto sm:mr-0">
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            size="xs"
            disabled={isBtnDisabled}
            onClick={handleOpenAiModal}
          >
            Ai
          </Button>
          <SegmentedControl
            value={preview}
            onChange={() => handleViewChange()}
            data={[
              {
                value: "edit",
                label: (
                  <Center>
                    <Icon name="edit_square" size={16} />
                    <Box mx={5}>Edit</Box>
                  </Center>
                ),
              },
              {
                value: "preview",
                label: (
                  <Center>
                    <Icon name="preview" size={16} />
                    <Box mx={5}>Preview</Box>
                  </Center>
                ),
              },
            ]}
            size="xs"
          />
        </div>
      </div>
      <AiAutoCompleteModal
        opened={opened}
        onClose={close}
        state={selectedText}
        onSubmit={handleAiCommand}
      />
    </>
  );
};

export default NewToolBar;
