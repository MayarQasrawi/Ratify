import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../../components/Input";
import { FaEnvelope } from "react-icons/fa";
import Header from "../../components/Header";
import Button from "../../components/Button";
import FormContainer from "../../components/FormContainer";
import useResetPassword from "../../hooks/auth/forgetpassword/useResetPassword";
import { useSearchParams } from "react-router-dom";
import useAutoFocus from "../../hooks/useAutoFocus";
import PasswordResetStepper from "../../components/shared/PasswordResetStepper";

const schema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }) .refine(
      (value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), 
      { message: "Password must include at least one unique character like @" }
    )
    .refine(
      (value) => /\d/.test(value), 
      { message: "Password must include at least one digit" }
    ),
    confirmPassword:z.string()
    .min(8, { message: "Password must be at least 8 characters" }) .refine(
      (value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), 
      { message: "Password must include at least one unique character like @" }
    )
    .refine(
      (value) => /\d/.test(value), 
      { message: "Password must include at least one digit" }
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate,isPending } = useResetPassword();
  const onSubmit = ({ password }) => {
    console.log({ password, token, email });
    mutate({ password, token, email });
  };
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const password = useAutoFocus();
  console.log(email, token);
  return (
  <div className="flex items-center gap-30 bg-gray-100 justify-center">
  <PasswordResetStepper currentStep={2} />
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      image={false}
      children={
        <div>
          <Header text="Reset Password" />
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            icon={<FaEnvelope />}
            register={() => {
              const registeration = register("password");
              return {
                ...registeration,
                ref: (el) => {
                  registeration.ref(el);
                  password.current = el;
                },
              };
            }}
            errors={errors}
          />
          <Input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            icon={<FaEnvelope />}
            register={register}
            errors={errors}
          />
          <Button btnText="Reset Password" disabled={isPending}/>
          <div className="mt-4 text-center"></div>
        </div>
      }
    />
    </div>
  );
}
