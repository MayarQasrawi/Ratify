import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useWeb3Forms from "@web3forms/react";
import Input from "../../Input"; // Import the Input component
import { contactSchema } from "../../../validation/validation";
import contact from "../../../assets/img/animation/contact.json";
import FormContainer from "../../FormContainer"; // Import the FormContainer component
import Header from "../../Header";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema), // Integrate Zod validation
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = "e0c096b1-f2d8-49a3-b23c-518562862ba9";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: "CredHub",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setResult(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setResult(msg);
    },
  });

  return (
    <div className="bg-blue-600">
      <FormContainer
        image={contact}
        onSubmit={handleSubmit(onSubmit)} // Pass the form submission handler
      >
        <Header text="Contact Us" />
        {/* Name Input */}
        <Input
          type="text"
          placeholder="Full Name"
          name="name"
          register={register}
          errors={errors}
          icon={<FaUser />}
        />

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Your Email"
          name="email"
          register={register}
          errors={errors}
          icon={<FaEnvelope />}
        />

        {/* Message Textarea */}
        <Input
          select="textarea"
          placeholder="Enter Your Message"
          name="message"
          register={register}
          errors={errors}
        />

        {/* Display Result Message */}
        {result && (
          <div
            className={`mt-4 text-center ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {result}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 cursor-pointer font-bold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Send <FiSend className="inline" size={20} />
        </button>
      </FormContainer>
    </div>
  );
}
