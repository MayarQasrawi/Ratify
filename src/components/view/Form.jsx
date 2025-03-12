import { useNavigate } from "react-router-dom";
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

import useSignup from "../../hooks/useSignUp";

// Define the Zod schema
const schema = z
  .object({
    fullName: z
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
  });
  // const { isError, isSuccess, error, mutateAsync, isLoading } = useMutation({
  //   mutationFn: async (userData) =>
  //     fetch(
  //       "https://9db9-139-190-139-146.ngrok-free.app/api/Auth/register/applicant",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(userData),
  //       }
  //     ),

  //   onSuccess: () => {
  //     // navigate("/login");

  //     // MUST UPDATE TO: show a success message or perform other actions
  //     console.log("Data posted successfully!");
  //   },
  //   onError: (error) => {
  //     console.error("Error posting data:", error);
  //   },
  // });
 const {isLoading,isError,error,mutate}=useSignup()
  const onSubmit = ({ email, password, fullName }) => {
    mutate({ email, password, fullName });
    console.log({ email, password, fullName })
  };
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      children={
        <div>
          <Header text="Create Account" />
          {isError && <div className="text-red-400">{error.message}</div>}

          {/* {isSuccess && (
            <div className="text-green-400">Success Registeration</div>
          )} */}
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
            btnText={isLoading ? "Signing Up..." : "Sign Up"}
            disabled={isLoading}
          />
        </div>
      }
    />
  );
}

export default Form;
