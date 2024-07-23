"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { UserAuthForm } from "../components/user-auth-form";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log("Logging in", { username, password });
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <BackgroundBeams />
      <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 lg:w-1/2"
        >
          <h1 className="mb-6 text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Sign in to GL1TCH
          </h1>
          <UserAuthForm />
          <p className="mt-6 text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block lg:w-1/2"
        >
          <div className="p-12 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-blue-400">
              Welcome to GL1TCH Range
            </h2>
            <p className="mb-6 text-lg">
              Glitch Range is a unified cyber attack/defense range for deploying
              training, testing, and competitions. It supports a variety of
              existing attack/defense deployment frameworks, including FAUST,
              CINI, and SECCONF.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;