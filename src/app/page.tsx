"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Binary, Boxes, Terminal, ChevronRight } from "lucide-react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";

const Home: NextPage = () => {
  const features = [
    { icon: Binary, title: "Train", content: "Access over 100 attack/defense services." },
    { icon: Terminal, title: "Test", content: "Configurable APIs and scalable environments." },
    { icon: Boxes, title: "Compete", content: "Full service support for competitions." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10">
        <header className="py-6">
          <nav className="container mx-auto flex justify-between items-center">
            <motion.h1 
              className="font-audiowide text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              GL1TCH
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="ghost" className="mr-4">Login</Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Sign Up</Button>
            </motion.div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              variants={itemVariants}
            >
              Cyber Attack/Defense Range
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              Deploy, train, test, and compete in a unified cyber environment supporting multiple frameworks.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Get Started <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                  <CardHeader className="flex flex-row items-center pb-2">
                    <feature.icon className="h-6 w-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <footer className="container mx-auto py-8 text-center text-gray-400">
          <p>&copy; 2024 GL1TCH RANGE. All rights reserved.</p>
        </footer>
      </div>

      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full fixed inset-0 -z-10"
        particleColor="#FFFFFF"
      />
    </div>
  );
};

export default Home;