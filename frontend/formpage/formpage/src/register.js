import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState(false);
  const [passwordValidation, setpasswordValidation] = useState(false);

  const [confirmpassword, setConfirmPassword] = useState("");
  const [confirmpasswordError, setConfirmpasswordError] = useState(false);
  const [confirmpasswordValidation, setConfirmpasswordValidation] =
    useState(false);
  const [
    confirmpasswordEqualityValidation,
    setConfirmpasswordEqualityValidation,
  ] = useState(false);

  const navigate = useNavigate();

  const handleInput = (event) => {
    let id = event.target.id;

    if (id == "name") {
      setName(event.target.value);
    }
    if (id == "email") {
      setEmail(event.target.value);
    }
    if (id == "password") {
      setPassword(event.target.value);
    }
    if (id == "confirmpassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const validate = () => {
    let emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    let passwordPattern = /(?=.*\d)(?=.*[A-z])(?=.*[a-z]).{8,}/;
    if (!name) {
      setNameError(true);
      setNameValidation(false);
    } else {
      if (name.length < 3) {
        setNameError(false);
        setNameValidation(true);
      } else {
        setNameError(false);
        setNameValidation(false);
      }
    }
    if (!email) {
      setEmailError(true);
      setEmailValidation(false);
    } else {
      let isValidEmail = emailPattern.test(email);

      if (!isValidEmail) {
        setEmailError(false);
        setEmailValidation(true);
      } else {
        setEmailError(false);
        setEmailValidation(false);
      }
    }
    if (!password) {
      setpasswordError(true);
      setpasswordValidation(false);
    } else {
      let isValidPassword = passwordPattern.test(password);

      if (!isValidPassword) {
        setpasswordError(false);
        setpasswordValidation(true);
      } else {
        setpasswordError(false);
        setpasswordValidation(false);
      }
    }
    if (!confirmpassword) {
      setConfirmpasswordError(true);
      setConfirmpasswordValidation(false);
    } else {
      let isValidPassword = passwordPattern.test(password);

      if (!isValidPassword) {
        setConfirmpasswordError(false);
        setConfirmpasswordValidation(true);
        setConfirmpasswordEqualityValidation(false);
      } else {
        if (password != confirmpassword) {
          setConfirmpasswordError(false);
          setConfirmpasswordValidation(false);
          setConfirmpasswordEqualityValidation(true);
        } else {
          setConfirmpasswordError(false);
          setConfirmpasswordValidation(false);
          setConfirmpasswordEqualityValidation(false);
        }
      }
    }
    if (
      name &&
      email &&
      password &&
      confirmpassword &&
      password == confirmpassword
    ) {
      axios
        .post("http://localhost:9000/user/addUser", {
          name: name,
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.status == 0) {
            swal("Oops!", response.data.message.toUpperCase(), "");
          } else if (response.data.status == 1) {
            swal("Success", response.data.message.toUpperCase(), "");
          }

          //window.location.href = "/";
        })
        .catch(function (error) {
          swal("Oops!", error.response.data.error.toUpperCase(), "error");
        });
    }
  };

  const backtologin = () => {
    navigate("/");
  };
  return (
    <>
      <div className="FormMainClass">
        <h3>Employee Registration Page</h3>
        <div className="FormInnerClass">
          <label className="labelClass">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            className="inputClass"
            value={name}
            onChange={handleInput}
          ></input>
        </div>
        <div className="errorMessage">
          {nameError ? (
            <span style={{ color: "red" }}>* Name is required</span>
          ) : (
            ""
          )}
          {nameValidation ? (
            <span style={{ color: "red" }}>
              * Name should contain more than 2 characters
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="FormInnerClass">
          <label className="labelClass">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="inputClass"
            value={email}
            onChange={handleInput}
          ></input>
        </div>
        <div className="errorMessage">
          {emailError ? (
            <span style={{ color: "red" }}>* Email is required</span>
          ) : (
            ""
          )}
          {emailValidation ? (
            <span style={{ color: "red" }}>* Enter a valid email</span>
          ) : (
            ""
          )}
        </div>
        <div className="FormInnerClass">
          <label className="labelClass">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="inputClass"
            value={password}
            onChange={handleInput}
          ></input>
        </div>
        <div className="errorMessage">
          {passwordError ? (
            <span style={{ color: "red" }}>* Password is required</span>
          ) : (
            ""
          )}
          {passwordValidation ? (
            <span style={{ color: "red" }}>* Enter a valid password</span>
          ) : (
            ""
          )}
        </div>
        <div className="FormInnerClass">
          <label className="labelClass">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="confirmpassword"
            className="inputClass"
            value={confirmpassword}
            onChange={handleInput}
          ></input>
        </div>
        <div className="errorMessage">
          {passwordError ? (
            <span style={{ color: "red" }}>* Password is required</span>
          ) : (
            ""
          )}
          {passwordValidation ? (
            <span style={{ color: "red" }}>* Enter a valid password</span>
          ) : (
            ""
          )}
          {confirmpasswordEqualityValidation ? (
            <span style={{ color: "red" }}>* Passwords are not matching</span>
          ) : (
            ""
          )}
        </div>
        <div className="btns d-flex">
          <Button
            className="ButtonWrapper submitbtn"
            variant="primary"
            onClick={validate}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="ButtonWrapper registerbtn"
            variant="primary"
            onClick={backtologin}
            type="submit"
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
