import { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import GoogleOAuth from "../components/GoogleOAuth.jsx";

const SignIn = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Signed in successfully");
        window.location.href = "/";
      }
      const data = await response.json();

      dispatch(signInSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error));
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[425px] h-[450px] flex flex-col gap-5 mt-28">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          className="outline-none w-full bg-gray-900 focus:shadow-md focus:shadow-violet-500/20 border-gray-700/10 border-2 placeholder:text-sm placeholder:text-gray-600 text-gray-300 text-sm hover:border-violet-200/20 transition-all focus:border-violet-600/30 rounded-lg px-4 py-2"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          className="outline-none w-full bg-gray-900 focus:shadow-md focus:shadow-violet-500/20 border-gray-700/10 border-2 placeholder:text-sm placeholder:text-gray-600 text-gray-300 text-sm hover:border-violet-200/20 transition-all focus:border-violet-600/30 rounded-lg px-4 py-2"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 bg-gray-700 text-gray-200 border border-gray-700 transition-all font-medium text-lg rounded-lg mt-3 hover:bg-transparent">
          {loading ? "Submitting..." : "Sign in"}
        </button>
        <div className="w-full flex items-center justify-center gap-2">
          <div className="h-px w-[25%] bg-gray-800" />
          <span className="text-gray-700 text-sm text-medium mb-0.5">or</span>
          <div className="h-px w-[25%] bg-gray-800" />
        </div>
        <GoogleOAuth />
        <span className="text-lg font-medium text-gray-100">
          {"Don't have an account"} ?
          <Link to={"/sign-up"} className="text-blue-600 underline ml-1">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
