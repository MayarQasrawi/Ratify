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
} from "../sharedImports";



// Zod schema for form validation
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

// Input fields configuration
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

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Integrate Zod with react-hook-form
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      
      children={
        <div>
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
          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")} // Register the checkbox with react-hook-form
              className="w-3 h-3 "
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-500">
              Remember Me
            </label>
          </div>

          <Button btnText="Login" />

          {/* Forgot Password Link */}
          <div className="mt-1 text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-indigo-500 hover:text-indigo-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-1 text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link
              to="/auth/signup"
              className="text-indigo-500 hover:text-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      }
    />
  );
}

export default Login;
