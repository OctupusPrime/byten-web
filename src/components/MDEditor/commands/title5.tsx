import { insertAtLineStart } from "../utils/InsertTextAtPosition";
import { ICommand, TextState, TextAreaTextApi } from "./";

export const title5: ICommand = {
  name: "title5",
  keyCommand: "title5",
  shortcuts: "ctrlcmd+5",
  value: "title5",
  execute: (state: TextState, api: TextAreaTextApi) => {
    if (state.selection.start === 0 || /\n$/.test(state.text)) {
      api.replaceSelection("##### ");
    } else {
      insertAtLineStart("##### ", state.selection.start, api.textArea);
    }
  },
};
