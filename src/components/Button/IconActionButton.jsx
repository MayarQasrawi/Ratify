// components/IconActionButton.jsx
import PropTypes from 'prop-types';

const IconActionButton = ({ 
  children,
  onClick,
  color = "blue",
  Icon,
  label,
  ariaLabel,
  className = "",
  ...props
}) => {
  const colorVariants = {
    blue: {
      bg: 'bg-blue-500/10',
      hover: 'hover:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
    },
    red: {
      bg: 'bg-red-500/10',
      hover: 'hover:bg-red-500/20',
      text: 'text-red-600 dark:text-red-400',
    },
    // Add more color variants as needed
    green: {
      bg: 'bg-green-500/10',
      hover: 'hover:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400',
    },
    gray: {
      bg: 'bg-gray-500/10',
      hover: 'hover:bg-gray-500/20',
      text: 'text-gray-600 dark:text-gray-400',
    },
    purple: {
      bg: 'bg-purple-500/10',
      hover: 'hover:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
    },
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 
        ${colorVariants[color]?.bg || colorVariants.blue.bg} 
        ${colorVariants[color]?.hover || colorVariants.blue.hover} 
        ${colorVariants[color]?.text || colorVariants.blue.text}
        ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {Icon && <Icon className="text-lg shrink-0" />}
      {label && <span className="text-sm font-medium">{label}</span>}
      {children}
    </button>
  );
};

IconActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['blue', 'red', 'green', 'purple']),
  Icon: PropTypes.elementType,
  label: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default IconActionButton;