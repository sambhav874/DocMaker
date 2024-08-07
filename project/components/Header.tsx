
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <nav className="min-h-[92px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center text-2xl justify-between gap-2 px-4 text-white">
      <Link href='/' className="md:flex-1 font-sans italic text-4xl font-extralight text-white shine-effect tracking-wider">
        DocMaker
        </Link>
        {children}
      </nav>
    </div>
  );
};

export default Header;
