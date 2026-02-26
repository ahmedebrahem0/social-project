// features/auth/schema/auth.schema.ts
import * as yup from "yup";


// Validation schema for login form
export const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters").matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
  ),
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
    .nullable()
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

//// Validation schema for change password form
export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .notOneOf([yup.ref("password")], "New password must be different from current password"),

  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

// TypeScript type for the form
export type RegisterFormValues = yup.InferType<typeof RegisterSchema>;
export type ChangePasswordFormValues = yup.InferType<typeof changePasswordSchema>;
export type LoginFormValues = yup.InferType<typeof loginSchema>;