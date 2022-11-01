import React, { useEffect, useState } from "react";
import Router from "next/router";
import { whoAmI } from "../lib/auth";
import { removeToken } from "../lib/token";
export default function Dashboard() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token =
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      (async () => {
        try {
          const data = await whoAmI();
          if (data.error === "Unauthorized") {
            redirectToLogin();
          } else {
            setUser(data.payload);
            setToken(token);
          }
        } catch (error) {
          redirectToLogin();
        }
      })();
    }
  }, []);

  function redirectToLogin() {
    Router.push("/auth/login");
  }

  function handleLogout(e) {
    e.preventDefault();

    removeToken();
    redirectToLogin();
  }

  if (user.hasOwnProperty("username")) {
    return (
      <>
        <nav
          className="navbar navbar-light"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Welcome {user.username}!
            </a>
            <button
              className="btn btn-info"
              type="button"
              style={{ color: "white", backgroundColor: "#0d6efd" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
        <h3 className="text-center my-4">{user.username}&apos;s Profile</h3>
        <p className="text-center my-3">
          <strong>Email: </strong>
          <br />
          {user.email}
        </p>
        <p className="text-center text-truncate">
          <strong>Access Token:</strong> <br />
          {token}
        </p>
      </>
    );
  }
  return <div>Welcome back soldier. Welcome to your empty profile.</div>;
}
