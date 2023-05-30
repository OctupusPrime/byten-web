import { ICommand, ExecuteState, TextAreaTextApi } from "./";
import { selectWord } from "../utils/markdownUtils";

export const strikethrough: ICommand = {
  name: "strikethrough",
  keyCommand: "strikethrough",
  shortcuts: "ctrl+shift+x",
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state.text,
      selection: state.selection,
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the bold mark up
    const val = state.command.value || "";
    api.replaceSelection(val.replace(/({{text}})/gi, state1.selectedText));

    const start = state1.selection.start + val.indexOf("{{text}}");
    const end =
      state1.selection.start +
      val.indexOf("{{text}}") +
      (state1.selection.end - state1.selection.start);
    // Adjust the selection to not contain the **
    api.setSelectionRange({ start, end });
  },
};
