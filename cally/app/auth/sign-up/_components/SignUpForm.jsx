"use client";

import { apiClient } from "@/lib/api";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const [error, setError] = useState("");

  const router = useRouter();

  const isFormValid = username && email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiClient.post("/auth/sign-up", {
        username,
        email,
        password,
      });

      const { token } = res.data;

      localStorage.setItem("token", token);

      router.push("/dashboard");

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Signup error:", err);
    }
  };

  function onClickAlreadyUser() {
    router.push("/auth/log-in");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md p-6 md:p-0 font-urbanist"
    >
      <div className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col text-center"
        >
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Create your account
          </h1>
          <p className="text-muted-foreground">
            Join and start scheduling smarter
          </p>
        </motion.div>

        {/* ❗ Error Display */}
        {error && (
          <p className="text-red-400 text-center text-sm">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Username
            </label>

            <GlassInputWrapper>
              <div className="flex items-center w-full">
                <span className="text-sm text-muted-foreground ml-2">
                  getcally.vercel.com/
                </span>

                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent text-sm p-2 focus:outline-none"
                />
              </div>
            </GlassInputWrapper>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email Address
            </label>
            <GlassInputWrapper>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm p-2 focus:outline-none"
              />
            </GlassInputWrapper>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <GlassInputWrapper>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm p-2 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </GlassInputWrapper>
          </div>

          <motion.button
            whileTap={{ scale: isFormValid ? 0.97 : 1 }}
            type="submit"
            disabled={!isFormValid}
            className={`cursor-pointer w-full rounded-xl py-2 font-medium shadow-md transition-colors
              ${
                isFormValid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
              }`}
          >
            Create Account
          </motion.button>
        </form>

        <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
          Already a Cally user?
          <button
            onClick={onClickAlreadyUser}
            className="text-gray-300 hover:underline transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
}
