import PropTypes from "prop-types";

export default function Heading({ size = 1, title }) {
  const VariableHeading = `h${size}`;
  return <VariableHeading className="heading">{title}</VariableHeading>;
}

Heading.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
};
