import PropTypes from "prop-types";

export default function ErrorMessage({ children }) {
  return <div className="error text-center mt-5">{children}</div>;
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
