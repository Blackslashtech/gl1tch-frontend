import { FC, FormEvent } from 'react';
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const RegisterPage: FC = () => {
  const router = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
