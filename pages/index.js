import React from "react";
import Link from "next/link";

const Homepage = () => {
  const styles = {
    width: "40%",
    justifyContent: "center",
    margin: "100px auto",
    padding: "40px",
    backgroundColor: "",
    boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.02)",
  };
  return (
    <div className="card" style={styles}>
      <div className="card-body">
        <h5 className="card-title">Welcome!</h5>
        <p className="card-text">
          If you've already registered then please log in, else please register.
        </p>
        <Link href="auth/login">
          <p className="btn btn-primary" style={{ marginRight: "30px" }}>
            Login
          </p>
        </Link>
        <Link href="auth/register">
          <p className="btn btn-primary">Register</p>
        </Link>
      </div>
    </div>
  );
};
Homepage.title = "Landing Page";
export default Homepage;
