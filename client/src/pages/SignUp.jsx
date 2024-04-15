import { set } from "mongoose";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state to null

  const handleEye = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(e.target.value));
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    setValidUsername(usernameRegex.test(e.target.value));
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error to null

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (data.success) {
        alert(data.message);
      } 
      else{
        setError(true); // Set error to true if there's an error
      }
      setLoading(false);


    } catch (err) {

      setLoading(false);
      setError(true);
      console.log(err);

    }
  };



  return (
    <div className="text-black select-none">
      <h1 className="text-black text-3xl text-center font-semibold my-7">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Username"
          className={`text-black border ${
            username.length > 0
              ? validUsername
                ? "border-green-500"
                : "border-red-500"
              : "border-gray-600"
          } rounded-md p-2 w-80 my-2 focus:outline-none`}
          onChange={handleUsername}
        />

        <p
          className="text-xs text-red-400"
          style={{
            display: validUsername || username.length == 0 ? "none" : "block",
          }}
        >
          Username must have 3-20 characters and can <br /> only contain
          letters, numbers, and underscores
        </p>

        <input
          type="email"
          placeholder="Email"
          className={`text-black border ${
            email.length > 0
              ? validEmail
                ? "border-green-500"
                : "border-red-500"
              : "border-gray-600"
          } rounded-md p-2 w-80 my-2 focus:outline-none`}
          onChange={handleEmail}
        />

        <div className="text-black flex flex-row items-center gap-2 w-80 my-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border bg-transparent focus:outline-none border-gray-600 rounded-md p-2 min-w-80"
            onChange={(e) => {
              setPassword(e.target.value);
              const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:',<.>/?~`]).{8,}$/;
              setValidPassword(regex.test(e.target.value));
            }}
          />

          <div className="relative w-0">
            {showPassword ? (
              <FaEyeSlash
                onClick={handleEye}
                className="absolute top-1/2 right-2 transform -translate-y-1/2  -translate-x-2 text-gray-700 cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={handleEye}
                className="absolute top-1/2 right-2 transform -translate-y-1/2  -translate-x-2 text-gray-700 cursor-pointer"
              />
            )}
          </div>
        </div>

        <p
          className={
            password.length > 0
              ? validPassword
                ? "text-xs text-green-500"
                : "text-xs text-red-500"
              : "text-xs text-gray-400"
          }
        >
          Password must have:
          <span className={password.length >= 8 ? "text-green-500" : ""}>
            {" "}
            8 characters,
          </span>
          <span
            className={/(?=.*[A-Z])/.test(password) ? "text-green-500" : ""}
          >
            {" "}
            1 uppercase letter,
          </span>{" "}
          <br />
          <span
            className={/(?=.*[a-z])/.test(password) ? "text-green-500" : ""}
          >
            {" "}
            1 lowercase letter,
          </span>
          <span className={/(?=.*\d)/.test(password) ? "text-green-500" : ""}>
            {" "}
            1 number,
          </span>
          <span
            className={
              /(?=.*[!@#$%^&*()_+[\]{}|;:',<.>/?~`])/g.test(password)
                ? "text-green-500"
                : ""
            }
          >
            {" "}
            1 special character
          </span>
        </p>

        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className={
            confirmPassword !== ""
              ? confirmPassword === password
                ? `border rounded-md p-2 w-80 my-2 b-3 border-green-500 focus:outline-none`
                : `border rounded-md p-2 w-80 my-2  b-3 border-red-500 focus:outline-none`
              : `border rounded-md p-2 w-80 my-2 b-3 border-gray-600 focus:outline-none`
          }
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-80 my-2"
          style={{
            backgroundColor:
              validPassword &&
              validEmail &&
              password === confirmPassword &&
              validUsername &&
              !loading
                ? "#2563EB"
                : "#A5B4FC",
          }}
          disabled={
            !validPassword ||
            !validEmail ||
            password !== confirmPassword ||
            !validUsername ||
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            loading
          }
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className="text-red-400">{error && "Something went wrong!"}</p>
      </form>

      <div className="text-black text-center mt-5">
        Already have an account?{"   "}
        <Link to="/sign-in" className=" underline text-blue-500">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
