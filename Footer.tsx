import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 md:p-6 text-center text-gray-500 text-sm bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          © {new Date().getFullYear()} QRCraft. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
          >
            <Github size={16} />
            <span>Source</span>
          </a>
          <a 
            href="#" 
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;