import PropTypes from "prop-types";
import Lottie from "lottie-react";
import login from "../assets/img/animation/loginA.json";
function FormContainer({ children, image = "true", onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      {/* Form Container */}
      {/* Image Container */}
      {image && (
        <div className="hidden lg:block mr-20 ">
          <Lottie
            animationData={login}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
      <div className="w-96 bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </div>
    </div>
  );
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required prop
  image: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a required function
};

export default FormContainer;
