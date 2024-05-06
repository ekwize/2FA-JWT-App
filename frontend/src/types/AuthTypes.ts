import { object, string } from "yup"


export interface ISignup {
  username: string
  email: string
  password: string
} 

export const validationSignupSchema = object().shape({
    username: string()
      .required("Username is required"),
    email: string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email address is invalid"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
})


export interface ILogin {
    username: string
    password: string
} 

export const validationLoginSchema = object().shape({
    username: string()
    .required("Username is required"),
    password: string()
    .required("Password is required")
})

export interface IUid {
  uid: string | undefined
}

export interface IActivate {
  uidb64: string | undefined
  token: string | undefined
}
