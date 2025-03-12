import PropTypes from "prop-types";
import classNames from "classnames";

const Input = ({ register, errors, select = "input", ...props }) => {
  const inputClass = classNames(
    "w-80 px-4 py-2 bg-gray-100 rounded-3xl shadow-sm hover:shadow-md focus:shadow-lg outline-none transition-shadow duration-200 border",
    {
      "pl-10": props.icon,
      "border-red-500": errors[props.name],
      "border-gray-300": !errors[props.name],
    }
  );

  return (
    <div className="mb-4">
      <div className="relative">
        {props.icon && (
          <span className="absolute inset-y-0 left-0 flex items-center text-gray-500 pl-3">
            {props.icon}
          </span>
        )}

        {select === "input" ? (
          <input
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            className={inputClass}
            {...register(props.name)}
          />
        ) : (
          <textarea
            name={props.name}
            placeholder={props.placeholder}
            className={inputClass}
            {...register(props.name)}
            rows="4" cols="50"
          />
        )}
      </div>

      {/* Display Validation Error */}
      {errors[props.name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[props.name].message}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  select: PropTypes.oneOf(["input", "textarea"]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default Input;