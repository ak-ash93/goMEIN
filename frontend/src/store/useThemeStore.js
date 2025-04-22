import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newtheme) => {
    localStorage.setItem("theme", newtheme);
    document.documentElement.setAttribute("data-theme", newtheme);
    set({ theme: newtheme });
  },
}));
