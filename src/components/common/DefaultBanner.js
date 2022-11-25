import PropTypes from "prop-types";
import defaultBanner from "../../images/common/default-banner.png";

export default function Banner(props) {
  return (
    <div style={{ backgroundImage: `url(${props.image !== "" && props.image !== null ? props.image : defaultBanner})` }} className={props.class}>
      {props.children}
    </div>
  );
}

Banner.propTypes = {
  class: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
};
