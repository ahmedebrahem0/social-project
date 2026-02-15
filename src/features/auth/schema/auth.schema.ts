// features/auth/schema/auth.schema.ts
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

// Validation schema for registration from

export const RegisterSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  rePassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),

  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test(
      "age",
      "You must be at least 13 years old",
      (value) => {
        if (!value) return false;
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 13;
      }
    ),

  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Gender must be male or female"),
});

// TypeScript type for the form
export type RegisterFormValues = yup.InferType<typeof RegisterSchema>;
