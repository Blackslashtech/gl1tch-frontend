import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black shadow-md py-4 absolute w-full">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>
        <div>
          <Link href="/register">
            <p className="bg-black-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded">
              Register
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
