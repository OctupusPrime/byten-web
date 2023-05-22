import { Locale } from "types/i18n";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocalizationState {
  state: Locale;
  changeLocale: (val: Locale) => void;
}

const useLocalizationStore = create<LocalizationState>()(
  persist(
    (set) => ({
      state: "en",
      changeLocale: (val) =>
        // eslint-disable-next-line
        set((_state) => {
          return { state: val };
        }),
    }),
    {
      name: "localization",
    }
  )
);

export type { LocalizationState };
export default useLocalizationStore;
