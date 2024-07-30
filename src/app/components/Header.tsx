"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-gray-900 py-6 fixed top-0 w-full border-b border-gray-800 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="font-audiowide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-3xl">GL1TCH</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
          <li>
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/instructions">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">Instructions</Button>
              </Link>
            </li>
            <li>
              <Link href="/attack-defense">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">Attack/Defense Guide</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;