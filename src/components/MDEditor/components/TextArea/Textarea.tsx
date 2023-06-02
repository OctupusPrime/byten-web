import React, { useContext, useEffect } from "react";
import { IProps } from "../../Editor";
import { EditorContext } from "../../Context";
import { TextAreaCommandOrchestrator } from "../../commands";
import handleKeyDown from "./handleKeyDown";
import shortcuts from "./shortcuts";

import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export interface TextAreaProps
  extends Omit<TextareaAutosizeProps, "value">,
    IProps {}

export default function Textarea(props: TextAreaProps) {
  const { prefixCls, onChange, ...other } = props;
  const {
    markdown,
    commands,
    fullscreen,
    preview,
    highlightEnable,
    extraCommands,
    tabSize,
    defaultTabEnable,
    dispatch,
  } = useContext(EditorContext);
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const executeRef = React.useRef<TextAreaCommandOrchestrator>();

  useEffect(() => {
    if (textRef.current && dispatch) {
      const commandOrchestrator = new TextAreaCommandOrchestrator(
        textRef.current
      );
      executeRef.current = commandOrchestrator;
      dispatch({ textarea: textRef.current, commandOrchestrator });
    }
  }, []);

  const onKeyDown = (
    e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    handleKeyDown(e, tabSize, defaultTabEnable);
    shortcuts(
      e,
      [...(commands || []), ...(extraCommands || [])],
      executeRef.current,
      dispatch,
      { fullscreen, preview, highlightEnable }
    );
  };

  return (
    <TextareaAutosize
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      {...other}
      ref={textRef}
      className={`${prefixCls}-text-input ${
        other.className ? other.className : ""
      }`}
      value={markdown}
      onChange={(e) => {
        dispatch && dispatch({ markdown: e.target.value });
        onChange && onChange(e);
      }}
      onKeyDown={onKeyDown}
    />
  );
}
