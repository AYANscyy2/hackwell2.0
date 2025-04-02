import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-slate-50 px-6 py-12 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <h3 className="text-gradient mb-4 text-xl font-bold">SkillSync</h3>
            <p className="text-muted-foreground mb-4 max-w-xs text-sm">
              Optimize resource allocation with our intelligent task-to-skill
              matching system.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-primary text-slate-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary text-slate-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary text-slate-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary text-slate-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-base font-semibold">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-base font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-4 text-base font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Knowledge Base
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-8 md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SkillSync. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
