import PropTypes from "prop-types";

function Header({ text }) {
  return (
    <h1 className="text-4xl font-bold text-center text-indigo-900 mb-10">
      {text}
    </h1>
  );
}

// Define propTypes for validation
Header.propTypes = {
  text: PropTypes.string.isRequired, // Ensure "text" is a required string
};

// Define defaultProps for fallback values
Header.defaultProps = {
  text: "Default Header", // Fallback text if "text" is not provided
};

export default Header;