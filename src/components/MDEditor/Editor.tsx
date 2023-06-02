import React, {
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useImperativeHandle,
  CSSProperties,
  PropsWithRef,
} from "react";
import MarkdownPreview, {
  MarkdownPreviewProps,
} from "@uiw/react-markdown-preview";
import TextArea, { ITextAreaProps } from "./components/TextArea";
import Toolbar from "./components/Toolbar";
import {
  getCommands,
  getExtraCommands,
  TextState,
  TextAreaCommandOrchestrator,
} from "./commands";
import { reducer, EditorContext, ContextStore, PreviewType } from "./Context";

export interface IProps {
  prefixCls?: string;
  className?: string;
}

export interface Statistics extends TextState {
  /** total length of the document */
  length: number;
  /** Get the number of lines in the editor. */
  lineCount: number;
}

export interface MDEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    IProps {
  /**
   * The Markdown value.
   */
  value?: string;
  /**
   * Event handler for the `onChange` event.
   */
  onChange?: (
    value?: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>,
    state?: ContextStore
  ) => void;
  /** Some data on the statistics editor. */
  onStatistics?: (data: Statistics) => void;
  /**
   * Can be used to make `Markdown Editor` focus itself on initialization. Defaults to on.
   * it will be set to true when either the source `textarea` is focused,
   * or it has an `autofocus` attribute and no other element is focused.
   */
  autoFocus?: ITextAreaProps["autoFocus"];
  /**
   * Show markdown preview.
   */
  preview?: PreviewType;
  /**
   * Full screen display editor.
   */
  fullscreen?: boolean;
  /**
   * Disable `fullscreen` setting body styles
   */
  overflow?: boolean;
  /**
   * This is reset [react-markdown](https://github.com/rexxars/react-markdown) settings.
   */
  previewOptions?: Omit<MarkdownPreviewProps, "source">;
  /**
   * Set the `textarea` related props.
   */
  textareaProps?: ITextAreaProps;

  toolbarClassName?: string;
  /**
   * The number of characters to insert when pressing tab key.
   * Default `2` spaces.
   */
  tabSize?: number;
  /**
   * If `false`, the `tab` key inserts a tab character into the textarea. If `true`, the `tab` key executes default behavior e.g. focus shifts to next element.
   */
  defaultTabEnable?: boolean;
  /**
   * Hide the tool bar
   */
  hideToolbar?: boolean;
  /**
   * The **`direction`** property sets the direction of text, table columns, and horizontal overflow. Use `rtl` for languages written from right to left (like Hebrew or Arabic), and `ltr` for those written from left to right (like English and most other languages).
   *
   * https://github.com/uiwjs/react-md-editor/issues/462
   */
  direction?: CSSProperties["direction"];
}

function setGroupPopFalse(data: Record<string, boolean> = {}) {
  Object.keys(data).forEach((keyname) => {
    data[keyname] = false;
  });
  return data;
}

export type RefMDEditor = ContextStore;

const InternalMDEditor = (
  props: MDEditorProps,
  ref?: ((instance: RefMDEditor) => void) | React.RefObject<RefMDEditor> | null
) => {
  const {
    prefixCls = "w-md-editor",
    className,
    value: propsValue,
    direction,
    preview: previewType = "live",
    fullscreen = false,
    overflow = true,
    previewOptions = {},
    textareaProps,
    toolbarClassName = "",
    autoFocus,
    tabSize = 2,
    defaultTabEnable = false,
    onChange,
    onStatistics,
    hideToolbar,
    ...other
  } = props || {};

  const cmds = getCommands();
  const extraCmds = getExtraCommands();

  const [state, dispatch] = useReducer(reducer, {
    markdown: propsValue,
    preview: previewType,
    tabSize,
    defaultTabEnable,
    scrollTop: 0,
    scrollTopPreview: 0,
    commands: cmds,
    extraCommands: extraCmds,
    fullscreen,
    barPopup: {},
  });
  const container = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    ...state,
    container: container.current,
    dispatch,
  }));
  useEffect(() => {
    const stateInit: ContextStore = {};
    if (container.current) {
      stateInit.container = container.current || undefined;
    }
    stateInit.markdown = propsValue || "";
    stateInit.barPopup = {};
    if (dispatch) {
      dispatch({ ...state, ...stateInit });
    }
  }, []);

  const cls = [
    className,
    "wmde-markdown",
    direction ? `${prefixCls}-${direction}` : null,
    prefixCls,
    state.preview ? `${prefixCls}-show-${state.preview}` : null,
    state.fullscreen ? `${prefixCls}-fullscreen` : null,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  useMemo(
    () =>
      propsValue !== state.markdown && dispatch({ markdown: propsValue || "" }),
    [propsValue, state.markdown]
  );

  useMemo(
    () => previewType !== state.preview && dispatch({ preview: previewType }),
    [previewType]
  );

  useMemo(() => tabSize !== state.tabSize && dispatch({ tabSize }), [tabSize]);

  useMemo(
    () => autoFocus !== state.autoFocus && dispatch({ autoFocus: autoFocus }),
    [autoFocus]
  );
  useMemo(
    () =>
      fullscreen !== state.fullscreen && dispatch({ fullscreen: fullscreen }),

    [fullscreen]
  );

  const textareaDomRef = useRef<HTMLDivElement>();
  const active = useRef<"text" | "preview">("preview");
  const initScroll = useRef(false);

  useMemo(() => {
    textareaDomRef.current = state.textareaWarp;
    const mouseOverListener = () => {
      active.current = "text";
    };

    const mouseLeaveListener = () => {
      active.current = "preview";
    };

    if (state.textareaWarp) {
      state.textareaWarp.addEventListener("mouseover", mouseOverListener);
      state.textareaWarp.addEventListener("mouseleave", mouseLeaveListener);
    }

    return () => {
      if (state.textareaWarp) {
        state.textareaWarp.removeEventListener("mouseover", mouseLeaveListener);
        state.textareaWarp.removeEventListener(
          "moyseleave",
          mouseLeaveListener
        );
      }
    };
  }, [state.textareaWarp]);

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>,
    type: "text" | "preview"
  ) => {
    const textareaDom = textareaDomRef.current;
    const previewDom = previewRef.current ? previewRef.current : undefined;
    if (!initScroll.current) {
      active.current = type;
      initScroll.current = true;
    }
    if (textareaDom && previewDom) {
      const scale =
        (textareaDom.scrollHeight - textareaDom.offsetHeight) /
        (previewDom.scrollHeight - previewDom.offsetHeight);
      if (e.target === textareaDom && active.current === "text") {
        previewDom.scrollTop = textareaDom.scrollTop / scale;
      }
      if (e.target === previewDom && active.current === "preview") {
        textareaDom.scrollTop = previewDom.scrollTop * scale;
      }
      let scrollTop = 0;
      if (active.current === "text") {
        scrollTop = textareaDom.scrollTop || 0;
      } else if (active.current === "preview") {
        scrollTop = previewDom.scrollTop || 0;
      }
      dispatch({ scrollTop });
    }
  };

  const previewClassName = `${prefixCls}-preview ${
    previewOptions.className || ""
  }`;

  const handlePreviewScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) =>
    handleScroll(e, "preview");

  const containerClick = () =>
    dispatch({ barPopup: { ...setGroupPopFalse(state.barPopup) } });

  const changeHandle = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(evn.target.value, evn, state);
    if (textareaProps && textareaProps.onChange) {
      textareaProps.onChange(evn);
    }
    if (
      state.textarea &&
      state.textarea instanceof HTMLTextAreaElement &&
      onStatistics
    ) {
      const obj = new TextAreaCommandOrchestrator(state.textarea!);
      const objState = (obj.getState() || {}) as TextState;
      onStatistics({
        ...objState,
        lineCount: evn.target.value.split("\n").length,
        length: evn.target.value.length,
      });
    }
  };

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      <div ref={container} className={cls} {...other} onClick={containerClick}>
        {!hideToolbar && <Toolbar className={toolbarClassName} />}
        <div className={`${prefixCls}-content`}>
          {/(edit|live)/.test(state.preview || "") && (
            <TextArea
              className={`${prefixCls}-input`}
              prefixCls={prefixCls}
              autoFocus={autoFocus}
              {...textareaProps}
              onChange={changeHandle}
              onScroll={(e) => handleScroll(e, "text")}
            />
          )}
          {/(live|preview)/.test(state.preview || "") && (
            <div ref={previewRef} className={previewClassName}>
              <MarkdownPreview
                {...previewOptions}
                onScroll={handlePreviewScroll}
                source={state.markdown || ""}
              />
            </div>
          )}
        </div>
      </div>
    </EditorContext.Provider>
  );
};

type Editor = React.FC<PropsWithRef<MDEditorProps>> & {
  Markdown: typeof MarkdownPreview;
};

const mdEditor: Editor = React.forwardRef(
  InternalMDEditor
) as unknown as Editor;

mdEditor.Markdown = MarkdownPreview;

export default mdEditor;
