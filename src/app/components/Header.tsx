import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/90 py-4 fixed top-0 w-full border-primary-dark border-b-05 backdrop-blur-xl z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className='font-audiowide text-foreground text-2xl'>
              GL1TCH
            </h1>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <Button variant="outline">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
