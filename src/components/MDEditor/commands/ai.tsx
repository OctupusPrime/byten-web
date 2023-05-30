import { ICommand, ExecuteState, TextAreaTextApi } from "./";

export const ai: ICommand = {
  name: "ai",
  keyCommand: "ai",
  value: "",
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    const val = state.command.value || "";

    api.replaceSelection(`${val}`);

    const position = state.selection.start + val.length;

    api.setSelectionRange({ start: position, end: position });
  },
};
