import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShare } from "@fortawesome/free-solid-svg-icons";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

const Header = ({ children } : HeaderProps) => {
  return (
    <nav className="flex items-center justify-between bg-dark-100 p-4">
      <div className="text-xl text-white">DocMaker</div>
      <div className="flex  items-center space-x-2 cursor-pointer font-sans text-xl">
        <span className="text-center text-white text-xl">{children}</span>
        <Button className="flex items-center hover:bg-white hover:text-dark-200 text-white space-x-1 p-2">
          <FontAwesomeIcon icon={faEdit} className="hover:text-dark-200 text-xl font-light h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button className="flex items-center text-white hover:bg-white hover:text-dark-200 space-x-1 p-2">
          Share
          <FontAwesomeIcon icon={faShare} className="hover:text-dark-200 text-xl font-light ml-2 h-4 w-4" />
        </Button>
        <SignedOut >
            <SignInButton  />
          
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
