"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";

// --- Glass Input Wrapper ---
const GlassInputWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10"
  >
    {children}
  </motion.div>
);

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  // form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { token } = res.data;

      // store token
      localStorage.setItem("token", token);

      router.push("/dashboard");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Login failed.");
      } else {
        setError("Network error. Try again.");
      }
    }
  };

  function onClickCreateAccount() {
    router.push("/auth/sign-up");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md p-6 md:p-0 font-urbanist"
    >
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col text-center"
        >
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Access your account and continue your journey with us
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <GlassInputWrapper>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm p-2 rounded-xs focus:outline-none"
              />
            </GlassInputWrapper>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <GlassInputWrapper>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm p-2 rounded-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </GlassInputWrapper>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="cursor-pointer w-full rounded-xl bg-primary py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
          >
            Sign In
          </motion.button>
        </form>

        {/* Switch to signup */}
        <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
          New to Cally?
          <button
            onClick={onClickCreateAccount}
            className="text-gray-300 hover:underline transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </p>
      </div>
    </motion.div>
  );
}
