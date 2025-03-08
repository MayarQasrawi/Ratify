import React, { useState } from "react";
import { Link, useLocation,NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
   const location=useLocation();
   console.log(location.pathname)
  // Array of navigation links
  const navLinks = [
    { name: "HOME", to: "/" },
    { name: "OUR TRACKS", to: "/our-tracks" },
    { name: "OUR Experts", to: "/our-experts" },
    { name: "DASHBOARD", to: "/dashboard" },
    { name: "CONTACT US", to: "/contact-us" },
  ];

  return (
    <nav className={` bg-white shadow-sm sticky top-0   text-sm  z-30 ${location.pathname=='/' ? 'absolute mt-[1%] mx-[1%] w-[98%]':'w-full'}  min-h-18 rounded-xl`}>
      <div className="container mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#003F7DDE]">
              CredHub
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex space-x-8 ">
            {navLinks.map((link, index) => (
              <NavLinks key={index} to={link.to} name={link.name}    />
            ))}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center text-md  font-bold space-x-4">
            <Link
              to="/auth/login"
              className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-[#3B82F6] text-white   px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4 ">
              {navLinks.map((link, index) => (
                <NavLink key={index} to={link.to} name={link.name} />
              ))}
              <Link
                to="/auth/login"
                className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-[#3B82F6] text-white font-bold  text-center px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks({ to, name }) {
  return (
    <NavLink end
      to={to}
      className={({ isActive }) => isActive ?'pb-1 border-b-2 border-blue-600':'text-gray-700 hover:text-blue-600 transition duration-300'}
    >
      {name}
    </NavLink>
  );
}

export default Navbar;
