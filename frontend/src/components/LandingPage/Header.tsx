import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white/90 px-6 py-5 backdrop-blur-sm md:px-10">
      <div className="flex items-center">
        <h1 className="text-gradient text-2xl font-bold tracking-tight">
          SkillSync
        </h1>
      </div>
      <div className="hidden items-center space-x-6 md:flex">
        <Button
          variant="ghost"
          className="hover:text-primary text-sm font-medium hover:bg-transparent"
        >
          About
        </Button>
        <Button
          variant="ghost"
          className="hover:text-primary text-sm font-medium hover:bg-transparent"
        >
          Features
        </Button>
        <Button
          variant="ghost"
          className="hover:text-primary text-sm font-medium hover:bg-transparent"
        >
          Pricing
        </Button>
        <Button
          variant="ghost"
          className="hover:text-primary text-sm font-medium hover:bg-transparent"
        >
          Contact
        </Button>
        <Button variant="default" className="text-sm font-medium">
          Get Started <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="md:hidden">
        <Button variant="ghost" size="icon" className="text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;
