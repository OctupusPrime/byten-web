import MarkDownEditor, {
  type ICommand,
  EditorContext,
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

const Toolbar = () => {
  const { commandOrchestrator, commands } = useContext(EditorContext);

  const handleH1 = () => {
    console.log(commands);

    if (commands?.[0]) commandOrchestrator?.executeCommand(commands[0]);
  };

  return (
    <>
      <button onClick={handleH1}>h1</button>
    </>
  );
};

const MDEditor = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Toolbar />
      <MarkDownEditor
        value={value}
        onChange={(val) => setValue(val ?? "")}
        commands={[textToImage]}
        extraCommands={[]}
      />
    </>
  );
};

export default MDEditor;
