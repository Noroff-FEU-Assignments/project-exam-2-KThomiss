import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PropTypes from "prop-types";

export const ThemeContext = createContext("dark");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
