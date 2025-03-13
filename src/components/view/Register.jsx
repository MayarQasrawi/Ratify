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
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
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
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
  });
  const { isError, error, mutate } = useSignup();
  const ref = useRef();
  console.log(ref);
  useEffect(() => {
    ref.current.focus()
    console.log(ref.current, "iiii");
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
          {/* Map over the inputFields array to render Input components */}
          {/* {inputFields.map((field, index) => (
            <Input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              icon={field.icon}
              register={register}
              errors={errors}
              element={index === 0 ? ref : null}
            />
          ))} */}
          {inputFields.map((field, index) => {
            // For the first field, capture the ref after registration
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
            btnText={isSubmitting ? "Signing Up..." : "Sign Up"}
            disabled={isSubmitting || !isValid}
          />
        </div>
      }
    />
  );
}

export default Form;
