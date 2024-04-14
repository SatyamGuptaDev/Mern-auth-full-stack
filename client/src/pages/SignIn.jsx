import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEye = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(e.target.value));
    setEmail(e.target.value);
  };

  return (
    <div className="text-black select-none">
      <h1 className="text-black text-3xl text-center font-semibold my-7">
        Sign In
      </h1>

      <form className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          className={`text-black border ${
            email.length > 0
              ? validEmail
                ? "border-green-500"
                : "border-red-500"
              : "border-gray-400"
          } rounded-md p-2 w-80 my-2 focus:outline-none`}
          onChange={handleEmail}
        />

        <div className="text-black flex flex-row items-center gap-2 w-80 my-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border bg-transparent border-gray-400 rounded-md p-2 min-w-80 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="relative w-0">
            {showPassword ? (
              <FaEyeSlash
                onClick={handleEye}
                className="absolute top-1/2 right-2 transform -translate-y-1/2  -translate-x-1/2 text-gray-700 cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={handleEye}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-1/2 text-gray-700 cursor-pointer"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 w-80 my-2"
          // Implement your Sign In logic here
          disabled={!validEmail || password === ""}
        >
          Sign In
        </button>
      </form>

      <div className="text-black text-center mt-5">
        Don't have an account?{" "}
        <Link to="/sign-up" className=" underline text-blue-500">
          Sign Up
        </Link>
      </div>

    </div>
  );
}

export default SignIn;
