import { memo, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { setToastInfo } from "../store/configSlice";
import Loading from "./Loading";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const inputClassName =
  "border rounded-md p-2 mb-2 w-full focus:outline-none focus:ring-2 transition-colors duration-200 focus:ring-blue-500 border-gray-300";

const buttonClassName =
  "rounded-md p-2 w-full transition duration-200 ease-in-out bg-blue-500 text-white hover:bg-blue-600";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData(initialFormState);
    setError(null);
  }, [isSignup]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isSignup ? "/user/signup" : "/user/login";
      const payload = isSignup
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(API_URL + endpoint, payload, {
        withCredentials: !isSignup,
      });

      dispatch(setToastInfo(response.data.message));

      if (isSignup) {
        setIsSignup(false);
      } else {
        dispatch(setUser(response.data.data));
        navigate("/");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      console.error(`${isSignup ? "Signup" : "Login"} error:`, errorMsg);
    }
  };

  const toggleMode = () => setIsSignup((prev) => !prev);


  return isAuthenticated ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="max-w-md w-full p-6 border rounded-md shadow-md bg-white text-black">
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <h2 className="font-semibold text-4xl mx-auto w-max mb-4">
            {isSignup ? "Register" : "Log In"} to PennyTrail
          </h2>

          {isSignup && (
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                required
                className={inputClassName}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              required
              className={inputClassName}
            />
          </div>

          {isSignup && (
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                className={inputClassName}
              />
            </div>
          )}

          {error && <div className="text-red-500 text-sm my-2">{error}</div>}

          <button
            type="submit"
            className={buttonClassName + " disabled:cursor-not-allowed"}
            disabled={
              isSignup
                ? !formData.name || !formData.email || !formData.password || !formData.confirmPassword
                : !formData.email || !formData.password
            }
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="mt-4 text-center">
            <p>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span
                onClick={toggleMode}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {isSignup ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Login);