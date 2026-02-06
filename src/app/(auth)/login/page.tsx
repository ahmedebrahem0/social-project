// app/(auth)/login/page.tsx
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata = {
  title: "تسجيل الدخول - Linked Posts",
  description: "سجل دخولك لحسابك في Linked Posts",
};

export default function LoginPage() {
  return <LoginForm />;
}
