import { changeTheme, getThemeValue } from "@utils/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppTheme = "light" | "auto" | "dark";
type Theme = "light" | "dark";

interface ThemeState {
  appTheme: AppTheme;
  changeAppTheme: (val: AppTheme) => void;
  theme: Theme;
  changeTheme: (val: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      appTheme: "auto",
      changeAppTheme: (val) =>
        set((_state) => {
          changeTheme(val);

          return { appTheme: val, theme: getThemeValue(val) };
        }),
      theme: "dark",
      changeTheme: (val) =>
        set((_state) => {
          return { theme: val };
        }),
    }),
    {
      name: "theme",
    }
  )
);

export type { ThemeState };
export default useThemeStore;
