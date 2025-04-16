// components/ModalButton.jsx
import PropTypes from 'prop-types';

const VARIANTS = {
  delete: 'bg-red-500 text-white hover:bg-red-600',
  cancel: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
  confirm: 'bg-blue-500 text-white hover:bg-blue-600', // Changed to blue
};

const ModalButton = ({ children,onClick, variant = 'confirm', className = '',...props}) => (
  <button className={`px-4 py-2 rounded-xl transition-colors duration-200 ${VARIANTS[variant]} ${className}`}  onClick={onClick}
    {...props}>
    {children}
  </button>
);

// Simplified PropType validation
ModalButton.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalButton;