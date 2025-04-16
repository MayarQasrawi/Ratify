import {
  useForm,
  FaEnvelope,
  FaLock,
  zodResolver,
  Link,
  Input,
  Button,
  Header,
  FormContainer,
  FaUser,
} from "../sharedImports";
import {registerSchema} from '../../validation/validation'
import signup from "../../assets/img/animation/signup.json";
import useSignup from "../../hooks/auth/useSignUp";
import { useEffect, useRef } from "react";
import Alert from "../shared/Alert";
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
    resolver: zodResolver(registerSchema), // Integrate Zod with react-hook-form
  });
  const { isError, error,isPending, mutate:signUp,isSuccess,data } = useSignup();
  const ref = useRef();
  useEffect(() => {
    ref.current.focus()
  }, []);

  const onSubmit = ({ email, password, fullName }) => {
    console.log({ email, password, fullName });
    signUp({ email, password, fullName });
  };
  console.log(data?.data,'kjjjjjjjjjs')
  return (
    <>
    {isError && <Alert type='error' message={error?.response?.data?.errors[0] ||'Network Error'} />}
    {isSuccess && <Alert  message={data.data.message}/>}
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      image={signup}
      size={{ width: "550px", height: "auto" }}
      children={
        <div>
          <Header text="Create Account" />
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
    </>
  );
}

export default  Register;
