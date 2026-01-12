"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/ui/toast";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isFormValid = Boolean(username && email && password);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!username || !email || !password) {
      toastManager.add({
        title: "Missing information",
        description: "Please fill in all required fields to continue.",
        type: "error"
      })
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toastManager.add({
          title: "Signup failed",
          description: data.error || "Something went wrong",
          type: "error",
        });
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toastManager.add({
        title: "Account created successfully!",
        description: "Welcome to Cally!",
        type: "success"
      })

      router.push('/dashboard');
    } catch (error) {
      console.error("Error during sign-up:", error);
      toastManager.add({
        title: "Network error",
        description: "Please check your internet connection.",
        type: "error",
      });
    } finally {
      setLoading(false)
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

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>

          <div className="*:not-first:mt-2">
            <Label>Username</Label>
            <div className="relative">
              <Input
                className="peer pl-33"
                placeholder="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                getcally.vercel.com/
              </span>
            </div>
          </div>

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
            disabled={loading}
            className={`cursor-pointer w-full rounded-md py-1.5 font-medium shadow-md transition-colors mt-2
              bg-primary text-primary-foreground hover:bg-primary/90`}
          >
            {loading ? "Creating..." : "Create Account"}
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
