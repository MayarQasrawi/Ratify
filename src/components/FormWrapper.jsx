// src/components/FormWrapper.js
import PropTypes from "prop-types";

function FormWrapper({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children}
    </form>
  );
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required prop
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a required function
};

export default FormWrapper;