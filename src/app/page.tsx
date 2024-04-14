"use client";

import Link from 'next/link';
import { FC } from 'react';


const LandingPage: FC = () => {
  return (
    <div>
      <h1>Welcome to the IoT Dashboard</h1>
      <Link href="/auth/login" passHref>
        <p style={{ position: 'absolute', top: 20, right: 20 }}>Login</p>
      </Link>
    </div>
  );
};

export default LandingPage;
