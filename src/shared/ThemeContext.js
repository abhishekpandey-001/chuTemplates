import { createContext } from "react";

export const defaultTheme = {
  bg: "bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200",
  floater: "💗",
  accent: "bg-pink-500",
};

export const ThemeContext = createContext(defaultTheme);