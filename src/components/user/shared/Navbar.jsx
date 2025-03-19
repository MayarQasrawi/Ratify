import React, { useState } from "react";
import { Link, useLocation,NavLink } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { HashLink } from 'react-router-hash-link';
function Navbar() {
  const {auth,logout}=useAuthContext();
  console.log(auth,'nabbbb')
  const [isOpen, setIsOpen] = useState(false);
   const location=useLocation();
   const style=location.pathname.includes('track-details') && {backgroundColor:'transparent',boxShadow:'none',position:'static'};
   console.log(style)
  // Array of navigation links
  const navLinks = [
    { name: "HOME", to: "/" },
    { name: "OUR TRACKS", to: "/our-tracks" },
    { name: "OUR TEAMS", to: "/our-experts" },
    { name: "DASHBOARD", to: "/my-tracks" },
  
  ];

  return (
    <nav className={` bg-white  shadow-sm  sticky top-[1%]  text-sm  z-30 absolute  mx-[1%] w-[98%] rounded-xl  min-h-18 `} style={style?style:{}} >
      <div className="container mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#003F7DDE]" style={style?{color:'white'}:{}}>
              CredHub
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:text-blue-600"
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
            <HashLink to='/#contact'  className="text-gray-700 hover:text-[#3B82F6] transition duration-300"> CONTACT US</HashLink>
          </div>

          {/* Action Buttons (Desktop) */}
         {auth ?<button onClick={()=>logout()} className="hidden lg:block cursor-pointer rounded-xl px-4 py-2 font-medium bg-[#3B82F6] hover:bg-[#003F7DDE] transition duration-300 text-white">Logout</button>: <div className="hidden lg:flex items-center text-md  font-bold space-x-4">
            <Link
            style={style?{border:'2px solid #fff',color:'#fff'}:{}}
              to="/login"
              className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
            >
              Login
            </Link>
            <Link
            style={style?{backgroundColor:'#fff',color:'black'}:{}}
              to="/signup"
              className="bg-[#3B82F6] text-white   px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
            >
              Create Account
            </Link>
          </div>}
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 mt-4 pb-4 ">
              {navLinks.map((link, index) => (
                <NavLinks key={index} to={link.to} name={link.name} />
                
              ))}
              <HashLink to='/#contact' className="text-gray-700 hover:text-[#3B82F6] transition duration-300"> CONTACT US</HashLink>
            {auth?<button onClick={()=>logout()} className="cursor-pointer rounded-xl px-4 py-2 font-medium bg-[#3B82F6] hover:bg-[#003F7DDE] transition duration-300 text-white">Logout</button>: <><Link
               style={style?{border:'2px solid #fff',color:'#fff'}:{}}
                to="login"
                className="border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-center px-4 py-2 rounded-xl hover:bg-[#3B82F6] hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
              style={style?{backgroundColor:'#fff',color:'black'}:{}}
                to="signup"
                className="bg-[#3B82F6] text-white font-bold  text-center px-4 py-2 rounded-xl hover:bg-[#003F7DDE] transition duration-300"
              >
                Create Account
              </Link>
              </>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks({ to, name }) {
  return (
    <NavLink end style={location.pathname.includes('track-details')?{color:'white'}:{}}
      to={to}
      className={({ isActive }) => isActive ?' text-[#3B82F6]   transition duration-300':'text-gray-700 hover:text-[#3B82F6] transition duration-300'}
    >
      {name}
    </NavLink>
  );
}

export default Navbar;
