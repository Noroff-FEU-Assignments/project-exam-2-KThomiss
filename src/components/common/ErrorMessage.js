import PropTypes from "prop-types";

export default function ErrorMessage({ children }) {
  return <div className="error">{children}</div>;
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
