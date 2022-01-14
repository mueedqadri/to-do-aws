import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [message, setMessage ] = useState('');

  const handleChange = (event) => {
    console.log();
    user[event.target.name] = event.target.value;
    setUser(user);
  };

  const register = () => {
    const { fullName, email, password } = user;
    let data = {
      username: email.split("@")[0],
      name: fullName,
      email,
      password,
    };
    fetch(`${process.env.REACT_APP_END_POINT}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == 200) {
        navigate("/login", {state: {message : 'Account Created Successfully! Please Login'}});
      } else {
        setMessage('Internal issue!')
      }
    });
  };

  const onSubmit = () => {
    const { fullName, confirmPassword, email, password } = user;
    let err = {};
    if (!fullName) {
      err.fullName = "Please enter your First Name";
    } else if (!/^[A-Za-z0-9]+$/.test(fullName)) {
      err.fullName = "Enter a valid First Name";
    }
    if (!email) {
      err.email = "Please enter your Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Enter a valid email id";
    }
    if (!password || !password.length) {
      err.password = "Please enter your password";
    } else if (password.length < 8) {
      err.password = "Password must be at least 8 characters long";
    }
    if (!confirmPassword || !confirmPassword.length) {
      err.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      err.confirmPassword = "Password does not match";
    }
    if (Object.getOwnPropertyNames(err).length === 0) {
      register();
    } else {
      setError(err);
    }
  };

  const toLogin = ()=>{
    navigate("/login")
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm mt-5">
            <h3>User Registration</h3>
            <h5 style={{color: 'red'}}>{message}</h5>
            <div className="col-md-12 ">
              <div>
                <label htmlFor="fullName">First Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  style={error.fullName && { border: "solid 1px red" }}
                />
                {error.fullName && <p>{error.fullName}</p>}
              </div>
            </div>
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
            <div className="col-md-12 inline-form">
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  className="form-control"
                  style={error.confirmPassword && { border: "solid 1px red" }}
                />
                {error.confirmPassword && <p>{error.confirmPassword}</p>}
              </div>
            </div>
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={onSubmit}
              >
                Submit
              </button>
              <br></br>
              <br></br>
              <div onClick={toLogin}>
                Already have an account?&nbsp;
                <div to="login" style={{color:'blue', cursor:'pointer'}}>Log In</div>
              </div>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </div>
  );
}
