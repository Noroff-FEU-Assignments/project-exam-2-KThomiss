import Carousel from "./Carousel";

export default function HomePage() {
  document.title = `Welcome | ToAd`;
  return (
    <div className="homepage-wrapper">
      <Carousel />
    </div>
  );
}
