import { useForm } from "react-hook-form";
import Input from "../Input";
import { FaEnvelope } from "react-icons/fa";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormContainer from "../FormContainer";
import FormWrapper from "../FormWrapper";
  // Define the Zod schema for forgot password
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Header text="Forgot Password" />
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          icon={<FaEnvelope />}
          register={register}
          errors={errors}
        />
        <Button btnText="Reset Password" />
        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          {/* <Link to="/login" className="text-indigo-500 hover:text-indigo-700">
            Back to Login
          </Link> */}
        </div>
      </FormWrapper>
    </FormContainer>
  );
}

export default ForgotPassword;