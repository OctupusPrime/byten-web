import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStatusState {
  isRedirectLoading: boolean;
  changeRedirectLoadingStatus: (val: boolean) => void;
}

const useAuthStatusStore = create<AuthStatusState>()(
  persist(
    (set) => ({
      isRedirectLoading: false,
      changeRedirectLoadingStatus: (val) =>
        set((_state) => {
          return { isRedirectLoading: val };
        }),
    }),
    {
      name: "auth-state",
    }
  )
);

export type { AuthStatusState };
export default useAuthStatusStore;
