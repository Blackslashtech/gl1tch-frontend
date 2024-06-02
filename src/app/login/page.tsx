"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { UserAuthForm } from "../components/user-auth-form";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log("Logging in", { username, password });
  };

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r border-primary-dark border-b-0">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-5">
            <p className="text-lg">
              Glitch Range is a unified cyber attack/defense range for deploying
              training, testing, and competitions. It supports a variety of
              existing attack/defense deployment frameworks, including FAUST,
              CINI, and SECCONF.
            </p>
            <footer className="flex flex-row text-sm gap-2">
              <p className="leading-none">Learn more</p>
              <ArrowRight className="h-4 w-4" />
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign into your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign into your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
