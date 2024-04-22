import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from "../components/OAuth.jsx";

function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const { loading, error } = useSelector((state) => state.user);

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const formData = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

      if (data.success) {
        console.log(data.data);
        alert(data.message);
        dispatch(signInSuccess(data.data));
      } 
      else{
        dispatch(signInFailure(data));
      }
      

    } catch (err) {
      dispatch(signInFailure(err));

    }
  };



  const user = useSelector((state) => state.user.currentUser);
  
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);





  return (
    <div className="text-black select-none">
      <h1 className="text-black text-3xl text-center font-semibold my-7">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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

        <p className=" text-xs  text-red-500">
          {email.length>0 ? (validEmail ? "" : "Invalid Email Format") : ""}
        </p>

        <div className="text-black flex flex-row items-center gap-2 w-80 my-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border bg-transparent border-gray-600 rounded-md p-2 min-w-80 focus:outline-none"
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
          className={`bg-blue-500 text-white rounded-md p-2 w-80 my-2 focus:outline-none ${
            !validEmail || loading || password === ""
              ? "cursor-not-allowed bg-blue-200"
              : "hover:bg-blue-600"
          }`}
          disabled={!validEmail || loading || password === ""}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p className="text-red-500">
          {error ? (error.message ? error.message : "Some error occured") : ""}
        </p>

        
      </form>

      <OAuth />

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
