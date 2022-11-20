import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-btn">
      {theme === "light" ? <MoonIcon className="icon theme-icon" /> : <SunIcon className="icon theme-icon" />}
    </button>
  );
}
