"use client";

import React, { useState } from "react";
import { Eye, EyeOff, InfoIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// --- Google Icon ---
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 
        8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 
        0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 
        6.053 29.268 4 24 4 12.955 4 4 12.955 4 
        24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z"
        />
        <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 
        15.108 18.961 12 24 12c3.059 0 5.842 
        1.154 7.961 3.039l5.657-5.657C34.046 
        6.053 29.268 4 24 4 16.318 4 9.656 
        8.337 6.306 14.691z"
        />
        <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 
        13.409-5.192l-6.19-5.238C29.211 35.091 
        26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 
        5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-.792 
        2.237-2.231 4.166-4.087 5.571l6.19 
        5.238C42.022 35.026 44 30.038 44 
        24c0-2.641-.21-5.236-.611-7.743z"
        />
    </svg>
);

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

export default function SignUpForm({
    onSignIn,
    onGoogleSignIn,
    onResetPassword,
    onCreateAccount,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    function onClickCreateAccount() {
        router.push("/auth/log-in");
    }

    // Check if all inputs are filled
    const isFormValid = username && email && password;

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
                        Create your account
                    </h1>
                    <p className="text-muted-foreground">
                        Join and start scheduling smarter
                    </p>
                </motion.div>

                {/* Form */}
                <form className="space-y-5" onSubmit={onSignIn}>
                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">
                            Username
                        </label>
                        <GlassInputWrapper>
                            <div className="flex items-center w-full">
                                <span className="text-sm text-muted-foreground select-none ml-2">
                                    cally.com/
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
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                                    )}
                                </button>
                            </div>
                        </GlassInputWrapper>

                        <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
                            <div className="flex items-center gap-1">
                                <InfoIcon size={14} />
                                <p>Mix of uppercase & lowercase letters</p>
                            </div>

                            <div className="flex items-center gap-1">
                                <InfoIcon size={14} />
                                <p>Minimum 7 characters long</p>
                            </div>

                            <div className="flex items-center gap-1">
                                <InfoIcon size={14} />
                                <p>Contain at least 1 number</p>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Buttons Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col gap-3"
                >
                    <motion.button
                        whileTap={{ scale: isFormValid ? 0.97 : 1 }}
                        type="submit"
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full rounded-xl py-2 font-medium transition-colors shadow-md 
              ${isFormValid
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                            }`}
                    >
                        Create Account
                    </motion.button>

                    <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                        Already a Cally user?{" "}
                        <button
                            onClick={onClickCreateAccount}
                            className="text-gray-300 hover:underline transition-colors cursor-pointer"
                        >
                            Sign In
                        </button>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}
