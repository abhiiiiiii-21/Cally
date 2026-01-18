"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toastManager } from "@/components/ui/toast";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  function onClickCreateAccount() {
    router.push("/auth/sign-up");
  }

  const isFormValid = Boolean(email && password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toastManager.add({
        description: "Please fill in all required fields to continue.",
        title: "Missing information",
        type: "error"
      })

      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toastManager.add({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        type: "error"
      })
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json();

      if (!res.ok) {
        toastManager.add({
          title: "Sign in failed",
          description: data.error || "Something went wrong",
          type: "error",
        });
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toastManager.add({
        title: "Account signed in successfully!",
        description: "Welcome to Cally!",
        type: "success",
        timeout: 1000
      })

      router.push('/dashboard')

    } catch (error) {
      console.error("Error during sign-in:", error);
      toastManager.add({
        title: "Error",
        description: error.message,
        type: "error",
      });
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-5xl font-semibold leading-tight">
            Sign in to account
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Enter your details to access your account.
          </p>
        </motion.div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>

          <div className="*:not-first:mt-2">
            <Label>Email ID</Label>
            <Input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" type="email" />
          </div>

          <div className="*:not-first:mt-2">
            <Label>
              Password
            </Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: isFormValid ? 0.97 : 1 }}
            type="submit"
            className="cursor-pointer w-full rounded-md py-1.5 font-medium shadow-md transition-colors mt-2
              bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? "Signing In ..." : "Sign In"}
          </motion.button>
        </form>

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
