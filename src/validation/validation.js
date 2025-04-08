import { z } from "zod";
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), {
        message: "Password must include at least one unique character like @",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must include at least one digit",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .refine((value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), {
        message: "Password must include at least one unique character like @",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must include at least one digit",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This associates the error with the confirmPassword field
  });
export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters" })
    .refine(
      (value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), // Ensure at least one unique character
      { message: "Password must include at least one unique character like @" }
    )
    .refine(
      (value) => /\d/.test(value), // Ensure at least one digit
      { message: "Password must include at least one digit" }
    ),
  rememberMe: z.boolean().optional(),
});
export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email " }),
});
export const changePasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), {
        message: "Password must include at least one unique character like @",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must include at least one digit",
      }),
    newPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .refine((value) => /[@,-,{,},(,),*,$,!,.,#,/,]/.test(value), {
        message: "Password must include at least one unique character like @",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must include at least one digit",
      }),
  })
 export const contactSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1, { message: "Message is required" }),
  });
 export  const resetPasswordSchema = z.object({
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
export const addEmployeeSchema =z.object({
  fullName: z
  .string()
  .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
})
  
