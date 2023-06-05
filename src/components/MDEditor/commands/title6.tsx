import { insertAtLineStart } from "../utils/InsertTextAtPosition";
import { ICommand, TextState, TextAreaTextApi } from "./";

export const title6: ICommand = {
  name: "title6",
  keyCommand: "title6",
  shortcuts: "ctrlcmd+6",
  value: "title6",
  execute: (state: TextState, api: TextAreaTextApi) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("###### ");
    } else {
      insertAtLineStart("###### ", state.selection.start, api.textArea);
    }
  },
};
