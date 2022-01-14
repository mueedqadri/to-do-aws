import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogIn() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (event) => {
    user[event.target.name] = event.target.value;
    setUser(user);
  };

  const onSubmit = () => {
    const { email, password } = user;
    let err = {};
    if (!email) {
      err.email = "Please enter your Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Enter a valid email id";
    }
    if (!password) {
      err.password = "Please enter your Password";
    }
    if (Object.getOwnPropertyNames(err).length === 0) {
      login(email, password);
    }
    setError(err);
  };

  const login = (email, password) => {
    const formData = new FormData();
    formData.append("username", email.split('@')[0]);
    formData.append("password", password);
    console.log(email.split('@')[0], password)
    fetch(`${process.env.REACT_APP_END_POINT}/auth/login`, {
      method: "POST",
      body: formData,
    })
      .then(function (res) {
        if (res.status == 200) {
          return res.json()
        } else {
          setErrMessage('Login Failed!')
        }
      }).then(data=>{
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('userId',email)
        navigate("/list");
      })
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm mt-5">
            <h3>Login</h3>
            <h5 style={{ color: "green" }}>
              {location.state ? location.state.message : ""}
            </h5>
            {errMessage && (
              <p style={{ color: "red" }}>{errMessage}</p>
            )}
            <div className="col-md-12 ">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="form-control"
                  style={error.email && { border: "solid 1px red" }}
                />
                {error.email && <p>{error.email}</p>}
              </div>
            </div>
            <div className="col-md-12 inline-form">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="form-control"
                  style={error.password && { border: "solid 1px red" }}
                />
                {error.password && <p>{error.password}</p>}
              </div>
            </div>
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={onSubmit}
              >
                Login
              </button>
              <br></br>
              <br></br>
              <div>
                Need an account?&nbsp;
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
}
