import { ICommand, TextState, TextAreaTextApi } from "./";
import { ContextStore, ExecuteCommandState } from "../Context";

export const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  shortcuts: "ctrlcmd+9",
  execute: (
    _state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[]
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      console.log("hit dispatch");
      dispatch({ preview: "preview" });
    }
  },
};

export const codeEdit: ICommand = {
  name: "edit",
  keyCommand: "preview",
  value: "edit",
  shortcuts: "ctrlcmd+7",
  execute: (
    _state: TextState,
    api: TextAreaTextApi,
    dispatch?: React.Dispatch<ContextStore>,
    executeCommandState?: ExecuteCommandState,
    shortcuts?: string[]
  ) => {
    api.textArea.focus();
    if (shortcuts && dispatch && executeCommandState) {
      dispatch({ preview: "edit" });
    }
  },
};
