'use client'

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { IconUser, IconMail, IconLock } from "@tabler/icons-react";
import Header from "../components/Header"; // Adjust the import path as necessary

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would handle the registration logic
    console.log("Registering", { username, password, email });
  };

  const InputField = ({ icon, type, placeholder, value, onChange }) => (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <InputField
              icon={<IconUser className="w-5 h-5 text-gray-400" />}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              icon={<IconMail className="w-5 h-5 text-gray-400" />}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              icon={<IconLock className="w-5 h-5 text-gray-400" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Register
            </motion.button>
          </form>
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;