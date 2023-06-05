import { insertAtLineStart } from "../utils/InsertTextAtPosition";
import { ICommand, TextState, TextAreaTextApi } from "./";

export const title3: ICommand = {
  name: "title3",
  keyCommand: "title3",
  shortcuts: "ctrlcmd+3",
  value: "title3",
  execute: (state: TextState, api: TextAreaTextApi) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("### ");
    } else {
      insertAtLineStart("### ", state.selection.start, api.textArea);
    }
  },
};
