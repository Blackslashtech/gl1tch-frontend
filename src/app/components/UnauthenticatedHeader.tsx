"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const UnauthenticatedHeader = () => {
  return (
    <header className="bg-gray-900 py-6 fixed top-0 w-full border-b border-gray-800 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="font-audiowide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-3xl">GL1TCH</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/support">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">Support</Button>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button variant="outline" className="text-gray-300 hover:text-white border-gray-700 hover:border-gray-600">Log In</Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="default" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">Sign Up</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UnauthenticatedHeader;