"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data: any) => {
    console.log("Support Request Submitted:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="container mx-auto p-4 dark:bg-background">
      <Header />
      <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Support</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-foreground">Frequently Asked Questions</h2>
        <div className="mt-4">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-medium dark:text-foreground">{item.question}</h3>
              <p className="dark:text-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-foreground">Contact Information</h2>
        <p className="mt-4 dark:text-foreground">If you need further assistance, you can contact us at:</p>
        <ul className="list-disc list-inside dark:text-foreground">
          <li>Email: support@example.com</li>
          <li>Phone: +1 234 567 8901</li>
          <li>Address: 1234 Cyber Street, Tech City, TX 75001</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-foreground">Support Request Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preferred Date</label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Preferred date is required" })}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md shadow-md">
            Your support request has been submitted successfully!
          </div>
        )}
      </section>
    </div>
  );
};

export default SupportPage;
