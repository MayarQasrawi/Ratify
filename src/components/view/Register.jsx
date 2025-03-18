import {
  useForm,
  FaEnvelope,
  FaLock,
  z,
  zodResolver,
  Link,
  Input,
  Button,
  Header,
  FormContainer,
  FaUser,
} from "../sharedImports";
import signup from "../../assets/img/animation/signup.json";
import useSignup from "../../hooks/auth/useSignUp";
import { useEffect, useRef } from "react";

// Define the Zod schema
const schema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine(
        (value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), 
        { message: "Password must include at least one unique character like @" }
      )
      .refine(
        (value) => /\d/.test(value), 
        { message: "Password must include at least one digit" }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }) .refine(
        (value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), 
        { message: "Password must include at least one unique character like @" }
      )
      .refine(
        (value) => /\d/.test(value), 
        { message: "Password must include at least one digit" }
      ),
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
    name: "fullName",
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
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
  });
  const { isError, error,isPending, mutate } = useSignup();
  const ref = useRef();
  useEffect(() => {
    ref.current.focus()
  }, []);

  const onSubmit = ({ email, password, fullName }) => {
    mutate({ email, password, fullName });
    console.log({ email, password, fullName });
  };
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      image={signup}
      size={{ width: "550px", height: "auto" }}
      children={
        <div>
          <Header text="Create Account" />
          {isError && <div className="text-red-400">{error.message}</div>}
          {inputFields.map((field, index) => {
            const fieldRegister =
              index === 0
                ? (name) => {
                  console.log(name)
                    const registration = register(name);
                    return {
                      ...registration,
                      ref: (el) => {
                        registration.ref(el);
                        ref.current = el;
                      },
                    };
                  }
                : register;

            return (
              <Input
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                icon={field.icon}
                register={fieldRegister}
                errors={errors}
              />
            );
          })}

          <div className="mt-1 text-center text-sm">
            <span className="text-gray-500">already have an account? </span>
            <Link
              to="/login"
              className="text-indigo-500 hover:text-indigo-700 underline"
            >
              Login
            </Link>
          </div>
          <Button
            btnText={ "Sign Up"}
            disabled={isPending }
          />
        </div>
      }
    />
  );
}

export default  Register;
