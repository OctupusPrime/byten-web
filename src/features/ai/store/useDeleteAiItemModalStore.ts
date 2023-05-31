import type { aiItem } from "types/data/ai";
import { create } from "zustand";

interface DeleteAiItemModalState {
  state?: aiItem;
  isVisible: boolean;
  openModal: (state: aiItem) => void;
  closeModal: () => void;
}

const useDeleteAiItemModalStore = create<DeleteAiItemModalState>()((set) => ({
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

export type { DeleteAiItemModalState };
export default useDeleteAiItemModalStore;
