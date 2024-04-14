"use client";
import { FC, FormEvent } from 'react';
import Link from 'next/link';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const LoginPage: FC = () => {
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('../../dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Log In</button>
      <Link href="../../auth/signup" passHref>
        <p>Need an account? Register</p>
      </Link>
    </form>
  );
};

export default LoginPage;
