import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full max-w-[890px] h-auto md:h-[80px] flex items-center justify-between px-6 py-4 mb-5 rounded-[122px] border border-[#FCFCFC] bg-white shadow-[0_0_20px_0_#7F7F7F26] mx-auto mt-[21px] relative">
      {/* Logo and Mobile Toggle */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src="/cmw.png" alt="Logo" className="h-10 w-auto" />
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6 text-[16px] gap-8 font-bold leading-[100%] tracking-normal text-gray-700">
        <li className="hover:text-[#625BF7] cursor-pointer">Home</li>
        <li className="hover:text-[#625BF7] cursor-pointer">Find Jobs</li>
        <li className="hover:text-[#625BF7] cursor-pointer">Find Talents</li>
        <li className="hover:text-[#625BF7] cursor-pointer">About Us</li>
        <li className="hover:text-[#625BF7] cursor-pointer">Testimonials</li>
      </ul>

      {/* Desktop CTA Button */}
      <div className="hidden md:block">
        <button
          onClick={onOpenModal}
          className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] hover:opacity-90 transition-all w-[123px] h-[38px] rounded-full px-5 py-2 text-white text-sm font-[500]"
        >
          Create Jobs
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[90px] left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden shadow-md rounded-b-lg">
          <ul className="flex flex-col items-center space-y-4 py-4 text-[16px] font-bold leading-[100%] tracking-normal text-gray-700">
            <li className="hover:text-[#625BF7] cursor-pointer">Home</li>
            <li className="hover:text-[#625BF7] cursor-pointer">Find Jobs</li>
            <li className="hover:text-[#625BF7] cursor-pointer">
              Find Talents
            </li>
            <li className="hover:text-[#625BF7] cursor-pointer">About Us</li>
            <li className="hover:text-[#625BF7] cursor-pointer">
              Testimonials
            </li>
            <button
              onClick={onOpenModal}
              className="bg-gradient-to-b from-[#A128FF] to-[#6100AD] hover:opacity-90 transition-all w-[123px] h-[38px] rounded-full px-6 py-2 text-white text-xs"
            >
              Create Jobs
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
