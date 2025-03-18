import React from "react";
import { HashLink } from 'react-router-hash-link';


const ScrollLink = ({ to, children, className }) => {
  return (
    <HashLink smooth to={to} className={className} > {children} </HashLink>
  )
};

export default ScrollLink;