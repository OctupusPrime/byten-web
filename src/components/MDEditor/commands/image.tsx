import { ICommand, ExecuteState, TextAreaTextApi } from "./";
import { selectWord } from "../utils/markdownUtils";

export const image: ICommand = {
  name: "image",
  keyCommand: "image",
  shortcuts: "ctrlcmd+k",
  value: "![image]({{text}})",
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    // Select everything
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";
    const val = state.command.value || "";
    api.replaceSelection(val.replace(/({{text}})/gi, imageTemplate));

    const start = state1.selection.start + val.indexOf("{{text}}");
    let end =
      state1.selection.start +
      val.indexOf("{{text}}") +
      (state1.selection.end - state1.selection.start);
    if (!state1.selectedText) {
      end = end + imageTemplate.length;
    }
    api.setSelectionRange({ start, end });
  },
};
