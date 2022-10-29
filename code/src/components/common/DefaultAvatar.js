import defaultAvatar from "../../images/default.jpeg";

export default function Avatar(props) {
  return <img className={props.class} src={props.image !== "" ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />;
}
