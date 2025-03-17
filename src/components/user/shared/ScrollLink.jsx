import React from "react";
import { Link } from "react-scroll";

const ScrollLink = ({ to, children, offset = -50, duration = 500, className }) => {
  return (
    <Link
      to={to}
      smooth={true}
      duration={duration}
      offset={offset}
      className={className}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;