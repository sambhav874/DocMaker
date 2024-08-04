import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShare } from "@fortawesome/free-solid-svg-icons";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const Header = ({ children , className } : HeaderProps) => {
  return (<div className={cn("header" , className)}>
    <nav className="flex items-center justify-between bg-dark-100 p-4">
      <div className="text-xl text-white">DocMaker</div>
      <div className="flex  items-center space-x-2 cursor-pointer font-sans text-xl">
        <span className="text-center text-white text-xl">
            {children}</span>
            
      
        
      
        
      </div>
    </nav>
    </div>
  );
};

export default Header;
