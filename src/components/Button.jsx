import PropTypes from "prop-types";

const Button = ({ btnText, type = "submit",disabled }) => {
  return (
    <button
      type={type} disabled={disabled}
      className="mt-3 w-80 bg-[#3B82F6] font-semibold cursor-pointer shadow-lg  text-white py-2 px-4 rounded-lg hover:bg-[#2F8FFF] focus:outline-none focus:ring-2 "
    >
      {btnText}
      
    </button>
  );
};

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.string,
};

export default Button;