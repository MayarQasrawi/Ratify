import { useForm } from "react-hook-form";
import Input from "../Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormContainer from "../FormContainer";
import FormWrapper from "../FormWrapper";
const inputFields = [
  {
    type: "email",
    placeholder: "Enter your email",
    name: "email",
    icon: <FaEnvelope />,
  },
  {
    type: "password",
    placeholder: "Enter your password",
    name: "password",
    icon: <FaLock />,
  },
];
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
function Login() {
  // Define the Zod schema for login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
    mode:'onChange'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // Input fields for login

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Header text="Login" />
        {/* Map over the inputFields array to render Input components */}
        {inputFields.map((field, index) => (
          <Input
            key={index}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            icon={field.icon}
            register={register}
            errors={errors}
          />
        ))}
        <Button btnText="Login" />
        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          {/* <Link to="/forgot-password" className="text-indigo-500 hover:text-indigo-700">
            Forgot Password?
          </Link> */}
        </div>
        {/* Sign Up Link */}
        {/*need modify after routing ") */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          {/* <Link to="/signup" className="text-indigo-500 hover:text-indigo-700">
            Sign Up
          </Link> */}
        </div>
      </FormWrapper>
    </FormContainer>
  );
}

export default Login;
