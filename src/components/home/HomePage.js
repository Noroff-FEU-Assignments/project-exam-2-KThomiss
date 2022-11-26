import Carousel from "./Carousel";

export default function HomePage() {
  document.title = `Welcome | ToAd`;
  return (
    <div className="theme-page-container homepage-container">
      <Carousel />
    </div>
  );
}
