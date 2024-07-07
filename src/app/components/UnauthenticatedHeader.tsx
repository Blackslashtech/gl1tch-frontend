"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const UnauthenticatedHeader = () => {
  return (
    <header className="bg-background/90 py-4 fixed top-0 w-full border-primary-dark border-b-05 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <h1 className="font-audiowide text-foreground text-2xl">GL1TCH</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/support">
                <Button variant="ghost">Support</Button>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UnauthenticatedHeader;
