import { create } from "zustand";

interface CreateNoteModalState {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useCreateNoteModalStore = create<CreateNoteModalState>()((set) => ({
  state: undefined,
  isEdit: false,
  isVisible: false,
  openModal: () =>
    set(() => ({
      isVisible: true,
    })),
  closeModal: () =>
    set(() => ({
      isVisible: false,
    })),
}));

export type { CreateNoteModalState };
export default useCreateNoteModalStore;
