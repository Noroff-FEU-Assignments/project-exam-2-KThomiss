import Carousel from "./Carousel";
import { useStore } from "../../context/PostContext";

export default function HomePage() {
  const { state } = useStore();
  console.log(state);

  document.title = `Welcome | ToAd`;
  return (
    <div className="theme-page-container homepage-container">
      <Carousel />
    </div>
  );
}
