import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Header from "../../components/Header";
import Button from "../../components/Button";
import FormContainer from "../../components/FormContainer";
import useResetPassword from "../../hooks/auth/forgetpassword/useResetPassword";

const resetPasswordField = [
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
const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
  });
  const { mutate } = useResetPassword();
  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      image={false}
      children={
        <div>
          <Header text="Forgot Password" />
          {resetPasswordField.map((field, index) => (
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

          <Button btnText="Reset Password" />
          <div className="mt-4 text-center"></div>
        </div>
      }
    />
  );
}
