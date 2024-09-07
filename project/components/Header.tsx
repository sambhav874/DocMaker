
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <nav className="min-h-[92px]   bg-dark-100 flex w-full items-center text-2xl justify-between gap-2 px-2 md:px-4 text-white space-x-2">
      <Link href='/' className="md:flex-1 px-2 font-sans italic md:text-4xl text-lg font-extralight text-white shine-effect md:tracking-wider ">
        DocMaker
        </Link>
        {children}
      </nav>
    </div>
  );
};

export default Header;
