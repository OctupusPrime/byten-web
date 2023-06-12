import { ICommand, ExecuteState, TextAreaTextApi } from "./";

export const hr: ICommand = {
  name: "hr",
  keyCommand: "hr",
  shortcuts: "ctrlcmd+h",
  value: "----------",
  execute: (state: ExecuteState, api: TextAreaTextApi) => {
    api.replaceSelection(
      `${state.selectedText}\n\n${state.command.value || ""}-\n\n`
    );
  },
};
