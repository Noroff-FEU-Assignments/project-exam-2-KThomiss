import Heading from "./Heading";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import imageDark from "../../images/common/notfound-dark.png";
import imageLight from "../../images/common/notfound-light.png";

export default function PageNotFound() {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="page-not-fount-container">
      <div style={{ backgroundImage: `url(${theme === "dark" ? imageDark : imageLight})` }} className="bg-image"></div>
      <Heading title="There is nothing here." />
      <Link to="/" className="cta">
        Back home
      </Link>
    </section>
  );
}
