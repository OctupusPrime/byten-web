import MarkDownEditor, {
  type ICommand,
  EditorContext,
  commands,
} from "@components/MDEditor";
import { useState, useContext } from "react";

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
        commands={[textToImage, commands.bold, commands.divider]}
        extraCommands={[]}
      />
    </>
  );
};

export default MDEditor;
