import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(theme);
  return <button onClick={toggleTheme}>Dark</button>;
}
