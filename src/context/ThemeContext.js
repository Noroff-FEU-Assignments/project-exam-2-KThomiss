import { createContext, useState } from "react";

export const ThemeContext = createContext("dark");

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return <ThemeContext.Provider value={[theme, toggleTheme]}>{children}</ThemeContext.Provider>;
};
