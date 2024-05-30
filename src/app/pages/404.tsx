"use client";
import React from "react";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import Link from "next/link";

const Custom404 = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        404 - Page Not Found
      </motion.h1>
      <p className="text-center text-white text-lg mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="mt-8 px-6 py-3 bg-cyan-500 text-white rounded-md">
          Go to Homepage
        </a>
      </Link>
    </LampContainer>
  );
};

export default Custom404;
