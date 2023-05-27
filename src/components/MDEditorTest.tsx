import MarkDownEditor, { type ICommand, commands } from "@components/MDEditor";
import { useState } from "react";

const textToImage: ICommand = {
  name: "Text To Image",
  keyCommand: "text2image",
  render(command, _disabled, executeCommand) {
    return (
      <button onClick={() => executeCommand(command)}>
        <p>test</p>
      </button>
    );
  },
  execute: (state, api) => {
    console.log("state", state);

    let modifyText = `## ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `## `;
    }
    api.replaceSelection(modifyText);
  },
};

const MDEditor = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <MarkDownEditor
        value={value}
        onChange={(val) => setValue(val ?? "")}
        preview="edit"
        commands={[
          textToImage,
          commands.bold,
          commands.divider,
          commands.codeEdit,
          commands.codePreview,
          commands.fullscreen,
        ]}
        extraCommands={[]}
      />
    </>
  );
};

export default MDEditor;
