import { create } from "zustand";

type StateTheme = {
  theme: string;
};

type ActionTheme = {
  setTheme: (theme: StateTheme["theme"]) => void;
};

const changeTheme = (theme: string) => {
  const htmlElement = document.getElementsByTagName("html")[0];
  console.log(theme);
  htmlElement.className = theme;
};

export type StoreTypes = StateTheme & ActionTheme;

export const useThemeStore = create<StoreTypes>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (theme: string) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    changeTheme(theme);
  },
}));
