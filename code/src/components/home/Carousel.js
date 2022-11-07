import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image1 from "../../images/home/carousel/image1.png";
import image2 from "../../images/home/carousel/image2.png";
import image3 from "../../images/home/carousel/interact.png";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

const slideImg = [
  { img: image1, title: "phone", content: "Picture 1" },
  { img: image2, title: "Profiles", content: "View a list of profiles" },
  { img: image3, title: "web", content: "Picture 3" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousImage = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slideImg.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const isLastSlide = currentIndex === slideImg.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const bgImageIndex = {
    backgroundImage: `url(${slideImg[currentIndex].img})`,
  };

  return (
    <>
      <Row className="g-0">
        <Col xs={12} md={6} lg={8} className="column-carousel-img">
          <div style={bgImageIndex} className="carousel-img-container"></div>
        </Col>
        <Col className="column-carousel-info">
          <div>{slideImg[currentIndex].content}</div>
        </Col>
      </Row>
      <Row className="g-0">
        <Col xs={12} md={6} lg={8} className="column-carousel-title">
          <div>{slideImg[currentIndex].title}</div>
        </Col>
        <Col className="column-carousel-prevBtn">
          <button onClick={previousImage}>
            <ArrowLeftIcon className="icon" />
          </button>
        </Col>
        <Col className="column-carousel-nextBtn">
          <button onClick={nextImage}>
            <ArrowRightIcon className="icon" />
          </button>
        </Col>
      </Row>
    </>
  );
}
