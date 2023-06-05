import { insertAtLineStart } from "../utils/InsertTextAtPosition";
import { ICommand, TextState, TextAreaTextApi } from "./";

export const title1: ICommand = {
  name: "title1",
  keyCommand: "title1",
  shortcuts: "ctrlcmd+1",
  value: "title1",
  execute: (state: TextState, api: TextAreaTextApi) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("# ");
    } else {
      insertAtLineStart("# ", state.selection.start, api.textArea);
    }
  },
};
