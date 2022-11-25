import PropTypes from "prop-types";

export default function PostMedia(props) {
  const imgHeight = "300px";
  const noImgHeight = "0";

  return <div style={{ backgroundImage: `url(${props.image})`, height: `${props.image !== "" && props.image !== null ? imgHeight : noImgHeight}` }} className="background-image post-media"></div>;
}

PostMedia.propTypes = {
  image: PropTypes.string,
};
