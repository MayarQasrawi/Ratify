import PropTypes from 'prop-types';

const Input = ({ register, errors, ...props }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        {props.icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {props.icon}
          </span>
        )}

        <input
          type={props.type}
          placeholder={props.placeholder}
          // name={props.name}
          className={`
            w-80 px-4 py-2 border rounded-lg shadow-sm hover:shadow-md outline-none   transition-shadow duration-200
            ${props.icon ? 'pl-10' : ''}
            ${errors[props.name] ? 'border-red-500' : 'border-gray-300'}
          `}
          {...register(props.name)}  // Register the input with react-hook-form
        />
      </div>
      {errors[props.name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[props.name].message}
        </span>
      )}
    </div>
  );
};

export default Input;