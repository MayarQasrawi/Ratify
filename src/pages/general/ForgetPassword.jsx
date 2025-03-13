import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { FaEnvelope } from "react-icons/fa";
import Button from "../../components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import   useSendEmail from "../../hooks/auth/forgetpassword/useSendEmail";
import Header from "../../components/Header";
import FormContainer from "../../components/FormContainer";
import useAutoFocus from '../../hooks/useAutoFocus'
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
  const { mutate } =  useSendEmail();
  const emailRef=useAutoFocus()
  
  const onSubmit = (data) => {
    console.log(data);
    mutate(data)
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      image={false}
      children={
        <div>
          <Header text="Forgot Password" />
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            icon={<FaEnvelope />}
            register={()=>{
              const registeration=register('email')
              return {
                ... registeration,ref:(el)=>{
                  registeration.ref(el)
                  emailRef.current=el
                }
              }
            }}
            errors={errors}
          />
          <Button btnText="Reset Password" />
          <div className="mt-4 text-center"></div>
        </div>
      }
    />
  );
}

export default ForgotPassword;
