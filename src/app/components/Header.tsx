"use client";

import { useEffect, useState } from "react";
import { auth } from "@/utils/firebase"; // Adjust the path as necessary
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import UnauthenticatedHeader from "../components/UnauthenticatedHeader";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
      {user ? <AuthenticatedHeader handleLogout={handleLogout} /> : <UnauthenticatedHeader />}
    </>
  );
};

export default Header;