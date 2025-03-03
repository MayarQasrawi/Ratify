// src/components/FormContainer.js
import PropTypes from "prop-types";

function FormContainer({ children }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white rounded-lg shadow-lg p-8">
        {children}
      </div>
    </div>
  );
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required prop
};

export default FormContainer;