import { ICommand, TextState, TextAreaTextApi } from "./";
import {
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
  selectWord,
} from "../utils/markdownUtils";

export const quote: ICommand = {
  name: "quote",
  keyCommand: "quote",
  shortcuts: "ctrlcmd+q",
  execute: (state: TextState, api: TextAreaTextApi) => {
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

    // Replaces the current selection with the quote mark up
    api.replaceSelection(
      `${breaksBefore}> ${state1.selectedText}${breaksAfter}`
    );

    const selectionStart = state1.selection.start + breaksBeforeCount + 2;
    const selectionEnd = selectionStart + state1.selectedText.length;

    api.setSelectionRange({
      start: selectionStart,
      end: selectionEnd,
    });
  },
};
