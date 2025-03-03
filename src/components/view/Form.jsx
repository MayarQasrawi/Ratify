import { useForm } from "react-hook-form";
import Input from "../Input";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../Header";
import FormContainer from "../FormContainer";
import FormWrapper from "../FormWrapper";
 // Define the Zod schema
const schema = z
.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // This associates the error with the confirmPassword field
});
// input fields
const inputFields = [
  {
    type: "text",
    placeholder: "Enter your name",
    name: "username",
    icon: <FaUser />,
  },
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
  {
    type: "password",
    placeholder: "Confirm your password",
    name: "confirmPassword",
    icon: <FaLock />,
  },
];
function Form() {
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
        <Header text="Create Account" />
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
        <Button btnText="Sign Up" />
      </FormWrapper>
    </FormContainer>
  );
}

export default Form;