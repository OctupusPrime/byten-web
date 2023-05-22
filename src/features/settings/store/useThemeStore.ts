import { changeTheme } from "@utils/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "auto" | "dark";

interface ThemeState {
  state: Theme;
  changeTheme: (val: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      state: "auto",
      changeTheme: (val) =>
        // eslint-disable-next-line
        set((_state) => {
          changeTheme(val);

          return { state: val };
        }),
    }),
    {
      name: "theme",
    }
  )
);

export type { ThemeState };
export default useThemeStore;
