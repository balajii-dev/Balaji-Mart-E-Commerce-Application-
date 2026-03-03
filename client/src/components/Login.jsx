import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { 
    setShowUserLogin, 
    setUser, 
    setIsLoggedin, 
    axios, 
    getUserData, 
    backendUrl 
  } = useAppContext();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint = state === "Sign Up" 
        ? `${backendUrl}/api/user/register` 
        : `${backendUrl}/api/user/login`;
        
      const payload = state === "Sign Up" ? { name, email, password } : { email, password };
      
      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsLoggedin(true);
        setUser(data.user);
        await getUserData();
        setShowUserLogin(false);
        toast.success(state === "Login" ? "Welcome back!" : "Account created!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Request failed at:", backendUrl);
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl relative w-full max-w-md border border-gray-100">
        <button
          onClick={() => setShowUserLogin(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-all text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {state === "Login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          {state === "Login" ? "Please sign in to continue" : "Join Balaji Mart today"}
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500 transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your valid email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your valid password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg mt-4 transition-all active:scale-95 shadow-md"
          >
            {state === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            {state === "Login" ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              {state === "Login" ? "Sign Up" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;