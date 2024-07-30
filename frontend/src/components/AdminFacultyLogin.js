import React, { useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import NotificationToast from "./NotificationToast";

const AdminFacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const lowercasedEmail = email.toLowerCase();

      const response = await fetch(
        "http://localhost:5173/api/login/admin-faculty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: lowercasedEmail, password }),
        }
      );
      setLoading(false);

      if (response.status === 401) {
        setMessage("Invalid email or password");
        handleShowToast();
        return;
      } else if (!response.ok) {
        setMessage("Somethingh went wrong from our side!");
        handleShowToast();
        return;
      }

      const { token, isAdmin } = await response.json();
      localStorage.setItem("jwt", token);
      localStorage.setItem("isAdmin", isAdmin);

      setMessage("Login sucessfull! , Welcome");
      handleShowToast();

      if (isAdmin) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/faculty/dashboard";
      }
    } catch (error) {
      console.error("Login error");
    }
  };

  return (
    <section className="m-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://www.wisdomking.or.th/images/user-login.svg"
              className="img-fluid"
              alt="LoginImage"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h2 className="mb-4">Admin/Faculty Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <NotificationToast
        show={showToast}
        setShow={setShowToast}
        message={message}
      />
    </section>
  );
};

export default AdminFacultyLogin;
