"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Instructions", path: "/instructions" },
    { name: "Attack/Defense Guide", path: "/attack-defense" },
  ];

  return (
    <header className="bg-gray-900 py-4 fixed top-0 w-full border-b border-gray-800 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
        <Link href="/">
          <h1 className="font-audiowide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-2xl md:text-3xl">GL1TCH</h1>
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.path} className="list-none">
              <Link href={item.path}>
                <Button
                  variant="ghost"
                  className={`${
                    pathname === item.path
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </nav>
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 px-4 py-4 bg-gray-900">
              {navItems.map((item) => (
                <li key={item.path} className="list-none">
                  <Link href={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full text-left ${
                        pathname === item.path
                          ? "text-white bg-gray-800"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;