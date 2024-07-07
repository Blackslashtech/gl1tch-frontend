// app/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/utils/firebase";
import UnauthenticatedHeader from "./Header";
import AuthenticatedHeader from "./AuthenticatedHeader";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {user ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <div className="h-16"></div> {/* Spacer to push content below header */}
    </>
  );
};

export default Header;