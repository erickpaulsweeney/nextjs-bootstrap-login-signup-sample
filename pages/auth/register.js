import { BaseAuthLayout } from "../../components/Auth/Base";
import { RegisterForm } from "../../components/Auth/Register";
import Link from "next/link";

Register.title = "Signup";

const styles = {
  marginTop: 10,
  textAlign: "center",
};

export default function Register() {
  return (
    <BaseAuthLayout>
      <RegisterForm />

      <div style={styles}>
        <Link href="/auth/login">Registered before? Login now!</Link>
      </div>
      <div style={styles}>
        <Link href="/">Back Home</Link>
      </div>
    </BaseAuthLayout>
  );
}
