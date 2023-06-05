import { ICommand, TextState, TextAreaTextApi } from "./";
import { ContextStore, ExecuteCommandState } from "../Context";

export const fullscreen: ICommand = {
  name: "fullscreen",
  keyCommand: "fullscreen",
  shortcuts: "ctrlcmd+0",
  value: "fullscreen",
  execute: (
    _state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[]
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ fullscreen: !executeCommandState.fullscreen });
    }
  },
};
