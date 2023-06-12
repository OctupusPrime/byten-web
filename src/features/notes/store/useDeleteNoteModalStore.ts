import type { NoteItem } from "types/data/notes";
import { create } from "zustand";

interface DeletNoteModalState {
  state?: NoteItem;
  isVisible: boolean;
  openModal: (state: NoteItem) => void;
  closeModal: () => void;
}

const useDeleteNoteModalStore = create<DeletNoteModalState>()((set) => ({
  state: undefined,
  isVisible: false,
  openModal: (pageState) =>
    set(() => ({
      state: pageState,
      isVisible: true,
    })),
  closeModal: () =>
    set(() => ({
      state: undefined,
      isVisible: false,
    })),
}));

export type { DeletNoteModalState };
export default useDeleteNoteModalStore;
