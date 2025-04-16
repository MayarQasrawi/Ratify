import PropTypes from "prop-types";
import Lottie from "lottie-react";

function FormContainer({ children, image, onSubmit, size = null ,fullWidth = true}) {
  return (
    <div className={`${fullWidth? "min-h-screen flex items-center justify-center bg-gray-100":" rounded-md  bg-gray-100 flex "} ${image&& 'p-10'} ` }>
      {/* Image Container */}
      {image && (
        <div className="hidden lg:block mr-20">
          <Lottie
            animationData={image}
            loop={true}
            autoplay={true}
            style={size != null ? size : { width: "100%", height: "auto" }}
          />
        </div>
      )}

      {/* Form Container */}
      <div className="min-w-80  px-6 flex flex-col  bg-white rounded-lg shadow-lg p-8 justify-around">
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </div>
    </div>
  );
}

// PropTypes Validation
FormContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a required prop
  image: PropTypes.object, // Define image as an optional object
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a required function
  size: PropTypes.object, // Define size as an optional object
  fullWidth: PropTypes.bool, // Define fullWidth as an optional boolean
};

export default FormContainer;