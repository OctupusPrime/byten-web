import React, { useEffect, useContext } from "react";
import {
  EditorContext,
  ContextStore,
  ExecuteCommandState,
} from "../../Context";
// import Markdown from "./Markdown";
import Textarea, { TextAreaProps } from "./Textarea";
import { IProps } from "../../Editor";
import { TextAreaCommandOrchestrator, ICommand } from "../../commands";
import "./index.css";

import type { TextareaAutosizeProps } from "react-textarea-autosize";

type RenderTextareaHandle = {
  dispatch: ContextStore["dispatch"];
  onChange?: TextAreaProps["onChange"];
  useContext?: {
    commands: ContextStore["commands"];
    extraCommands: ContextStore["extraCommands"];
    commandOrchestrator?: TextAreaCommandOrchestrator;
  };
  shortcuts?: (
    e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>,
    commands: ICommand[],
    commandOrchestrator?: TextAreaCommandOrchestrator,
    dispatch?: React.Dispatch<ContextStore>,
    state?: ExecuteCommandState
  ) => void;
};

export interface ITextAreaProps
  extends Omit<TextareaAutosizeProps, "value" | "onScroll">,
    IProps {
  value?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  renderTextarea?: (
    props:
      | React.TextareaHTMLAttributes<HTMLTextAreaElement>
      | React.HTMLAttributes<HTMLDivElement>,
    opts: RenderTextareaHandle
  ) => JSX.Element;
}

export type TextAreaRef = {
  text?: HTMLTextAreaElement;
  warp?: HTMLDivElement;
};

export default function TextArea(props: ITextAreaProps) {
  const { prefixCls, className, onScroll, renderTextarea, ...otherProps } =
    props || {};
  const { scrollTop, dispatch } = useContext(EditorContext);

  const warp = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const state: ContextStore = {};
    if (warp.current) {
      state.textareaWarp = warp.current || undefined;
      warp.current.scrollTop = scrollTop || 0;
    }
    if (dispatch) {
      dispatch({ ...state });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={warp}
      className={`${prefixCls}-area ${className || ""}`}
      onScroll={onScroll}
    >
      <div className={`${prefixCls}-text`}>
        {/* {highlightEnable && <Markdown prefixCls={prefixCls} />} */}
        <Textarea prefixCls={prefixCls} {...otherProps} />
      </div>
    </div>
  );
}
