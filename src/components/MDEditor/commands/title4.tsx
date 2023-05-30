import { insertAtLineStart } from "../utils/InsertTextAtPosition";
import { ICommand, TextState, TextAreaTextApi } from "./";

export const title4: ICommand = {
  name: "title4",
  keyCommand: "title4",
  shortcuts: "ctrlcmd+4",
  value: "title4",
  execute: (state: TextState, api: TextAreaTextApi) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("#### ");
    } else {
      insertAtLineStart("#### ", state.selection.start, api.textArea);
    }
  },
};
