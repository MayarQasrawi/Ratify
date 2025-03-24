import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import ScrollLink from "./ScrollLink";
// Reusable QuickLinks Component
const QuickLinks = ({ links }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-bold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <ScrollLink
              to={link.target}
              children={link.text}
              className="text-sm cursor-pointer text-white hover:text-gray-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Reusable SocialIcons Component
const SocialIcons = ({ socialLinks }) => {
  return (
    <div className="text-center md:text-right">
      <h3 className="text-lg font-bold mb-4">Follow Us</h3>
      <div className="flex justify-center md:justify-end space-x-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            className="text-white hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

// Main Footer Component
function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Update the year if the component mounts in a new year
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Quick Links Data
  const quickLinks = [
    { text: "Home", target: "/#" },
    { text: "Tracks", target: "/our-tracks#" },
    { text: "About", target: "/#about" },
    { text: "Contact", target: "/#contact" },
  ];

  // Social Links Data
  const socialLinks = [
    { url: "/", icon: <FaFacebook className="text-xl" /> },
    { url: "#", icon: <FaTwitter className="text-xl" /> },
    { url: "#", icon: <FaInstagram className="text-xl" /> },
    { url: "#", icon: <FaLinkedin className="text-xl" /> },
    { url: "tel:+970594476680", icon: <FaPhone className="text-xl" /> }, // Phone link
  ];

  return (
    <>
      <footer className="bg-[var(--secondary-color)] text-white py-8 mt-32 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-sm text-white">
                We are a company dedicated to providing the best services.
              </p>
            </div>

            {/* Quick Links Section */}
            <QuickLinks links={quickLinks} />

            {/* Social Media Section */}
            <SocialIcons socialLinks={socialLinks} />
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white mt-8 pt-8 text-center">
            <p className="text-sm text-white">
              &copy; {currentYear} Ratify All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
