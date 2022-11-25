import PropTypes from "prop-types";
import defaultAvatar from "../../images/common/default-avatar.png";

export default function Avatar(props) {
  return <img className={props.class} src={props.image !== "" && props.image !== null ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />;
}

Avatar.propTypes = {
  class: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
};
