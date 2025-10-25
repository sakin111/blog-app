import LoginForm from "@/components/modules/Auth/LoginForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login",
  description:
    "login page for authentication only user can access through login",
};


const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;