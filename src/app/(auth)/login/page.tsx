// app/(auth)/login/page.tsx
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata = {
  title: "login - Linked Posts",
  description: "Login to your Linked Posts account",
};

export default function LoginPage() {
  return <LoginForm />
}
