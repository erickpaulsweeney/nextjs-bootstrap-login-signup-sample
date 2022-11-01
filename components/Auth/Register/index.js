import { useState } from "react";
import { registerUser } from "../../../lib/auth";
import Router from "next/router";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await registerUser({
        username,
        password,
        email,
      });
      console.log(data);

      if (data.isSuccessful) {
        Router.push("/auth/login");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="h1">Sign up</legend>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="emailInput"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="usernameInput"
            className="form-control"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </fieldset>
    </form>
  );
}
