"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { IconMail, IconPhone, IconMapPin, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact support by filling out the form on this page or by emailing us directly at support@example.com.",
  },
  {
    question: "Where can I find the user guide?",
    answer: "The user guide is available in the documentation section of our website. You can access it through the Help menu in your dashboard.",
  },
];

const SupportPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const onSubmit = (data) => {
    console.log("Support Request Submitted:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <BackgroundBeams />
      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Support Center
        </motion.h1>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {openFAQ === index ? <IconChevronUp /> : <IconChevronDown />}
                </button>
                {openFAQ === index && (
                  <div className="p-4 bg-gray-700">
                    <p>{item.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <IconMail className="w-6 h-6 mr-2 text-blue-400" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center">
              <IconPhone className="w-6 h-6 mr-2 text-green-400" />
              <span>+1 234 567 8901</span>
            </div>
            <div className="flex items-center">
              <IconMapPin className="w-6 h-6 mr-2 text-red-400" />
              <span>1234 Cyber Street, Tech City, TX 75001</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Support Request Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-1">Preferred Date</label>
              <input
                id="date"
                type="date"
                {...register("date", { required: "Preferred date is required" })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>

            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300">Submit Request</button>
          </form>

          {isSubmitted && (
            <motion.div 
              className="mt-4 p-4 bg-green-800 text-green-200 rounded-md shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your support request has been submitted successfully!
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default SupportPage;