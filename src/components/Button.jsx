import PropTypes from "prop-types";

const Button = ({ btnText, type = "submit" }) => {
  return (
    <button
      type={type}
      className="mt-3 w-80 bg-indigo-900  shadow-lg shadow-indigo-500/50 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {btnText}
    </button>
  );
};

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;