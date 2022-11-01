import { BaseAuthLayout } from "../../components/Auth/Base";
import { LoginForm } from "../../components/Auth/Login";
import Link from "next/link";

Login.title = "Login";

const styles = {
  marginTop: 10,
  textAlign: "center",
};

export default function Login() {
  return (
    <BaseAuthLayout>
      <LoginForm />

      <div style={styles}>
        <Link href="/auth/register">Not account yet? Sign up now!</Link>
      </div>
      <div style={styles}>
        <Link href="/">Back Home</Link>
      </div>
    </BaseAuthLayout>
  );
}
