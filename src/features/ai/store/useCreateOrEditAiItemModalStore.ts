import type { aiItem } from "types/data/ai";
import { create } from "zustand";

interface DeleteAiItemModalState {
  state?: aiItem;
  createType?: aiItem["type"];
  isEdit?: boolean;
  isVisible: boolean;
  openModal: (state?: aiItem, createType?: aiItem["type"]) => void;
  closeModal: () => void;
}

const useDeleteAiItemModalStore = create<DeleteAiItemModalState>()((set) => ({
  state: undefined,
  isEdit: false,
  isVisible: false,
  openModal: (pageState, createType) =>
    set(() => ({
      state: pageState,
      isEdit: !!pageState,
      createType,
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
