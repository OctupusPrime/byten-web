import { ICommand, TextState, TextAreaTextApi } from "./";
import {
  selectWord,
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
} from "../utils/markdownUtils";

export type AlterLineFunction = (line: string, index: number) => string;

/**
 * Inserts insertionString before each line
 */
export function insertBeforeEachLine(
  selectedText: string,
  insertBefore: string | AlterLineFunction
): { modifiedText: string; insertionLength: number } {
  const lines = selectedText.split(/\n/);

  let insertionLength = 0;
  const modifiedText = lines
    .map((item, index) => {
      if (typeof insertBefore === "string") {
        insertionLength += insertBefore.length;
        return insertBefore + item;
      } else if (typeof insertBefore === "function") {
        const insertionResult = insertBefore(item, index);
        insertionLength += insertionResult.length;
        return insertBefore(item, index) + item;
      }
      throw Error("insertion is expected to be either a string or a function");
    })
    .join("\n");

  return { modifiedText, insertionLength };
}

export const makeList = (
  state: TextState,
  api: TextAreaTextApi,
  insertBefore: string | AlterLineFunction
) => {
  // Adjust the selection to encompass the whole word if the caret is inside one
  const newSelectionRange = selectWord({
    text: state.text,
    selection: state.selection,
  });
  const state1 = api.setSelectionRange(newSelectionRange);

  const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
    state1.text,
    state1.selection.start
  );
  const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

  const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
    state1.text,
    state1.selection.end
  );
  const breaksAfter = Array(breaksAfterCount + 1).join("\n");

  const modifiedText = insertBeforeEachLine(state1.selectedText, insertBefore);

  api.replaceSelection(
    `${breaksBefore}${modifiedText.modifiedText}${breaksAfter}`
  );

  // Specifically when the text has only one line, we can exclude the "- ", for example, from the selection
  const oneLinerOffset =
    state1.selectedText.indexOf("\n") === -1 ? modifiedText.insertionLength : 0;

  const selectionStart =
    state1.selection.start + breaksBeforeCount + oneLinerOffset;
  const selectionEnd =
    selectionStart + modifiedText.modifiedText.length - oneLinerOffset;

  // Adjust the selection to not contain the **
  api.setSelectionRange({
    start: selectionStart,
    end: selectionEnd,
  });
};

export const unorderedListCommand: ICommand = {
  name: "unordered-list",
  keyCommand: "list",
  shortcuts: "ctrl+shift+u",
  value: "- ",
  execute: (state: TextState, api: TextAreaTextApi) => {
    makeList(state, api, "- ");
  },
};

export const orderedListCommand: ICommand = {
  name: "ordered-list",
  keyCommand: "list",
  shortcuts: "ctrl+shift+o",
  value: "1. ",
  execute: (state: TextState, api: TextAreaTextApi) => {
    makeList(state, api, (_item, index) => `${index + 1}. `);
  },
};

export const checkedListCommand: ICommand = {
  name: "checked-list",
  keyCommand: "list",
  shortcuts: "ctrl+shift+c",
  icon: (
    <svg
      data-name="checked-list"
      width="12"
      height="12"
      role="img"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M208 132h288c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zM64 368c-26.5 0-48.6 21.5-48.6 48s22.1 48 48.6 48 48-21.5 48-48-21.5-48-48-48zm92.5-299l-72.2 72.2-15.6 15.6c-4.7 4.7-12.9 4.7-17.6 0L3.5 109.4c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.3c4.7-4.7 12.3-4.7 17 0l17 16.5c4.6 4.7 4.6 12.3-.1 17zm0 159.6l-72.2 72.2-15.7 15.7c-4.7 4.7-12.9 4.7-17.6 0L3.5 269c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.7c4.7-4.7 12.3-4.7 17 0l17 17c4.6 4.6 4.6 12.2-.1 16.9z"
      />
    </svg>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    makeList(state, api, () => `- [ ] `);
  },
};
