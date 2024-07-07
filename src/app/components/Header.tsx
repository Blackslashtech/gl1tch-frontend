"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/firebase"; // Adjust the path as necessary
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <header className="bg-background/90 py-4 fixed top-0 w-full border-primary-dark border-b-05 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="font-audiowide text-foreground text-2xl">
                GL1TCH
              </h1>
            </Link>
          </div>
          <div>
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline">Get started</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer to push content below header */}
    </>
  );
};

export default Header;