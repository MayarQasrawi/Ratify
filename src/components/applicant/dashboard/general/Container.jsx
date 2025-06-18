import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

function Container({ children, header, className, descriptions, Open=true }) {
  const [isOpen, setIsOpen] = useState(Open);
  const [hasLoaded, setHasLoaded] = useState(Open);

  const toggle = () => {
    setIsOpen((prev) => !prev);
    if (!hasLoaded) setHasLoaded(true);
  };

  return (
    <section
      className={`mx-8  mt-6 w-[96%] bg-white text-[var(--secondary-color)] rounded-2xl shadow-md p-6  flex flex-col justify-center ${className}`}
    >
      {/* Header section */}
      <div
        className={`flex justify-between items-center cursor-pointer ${
          isOpen ? "border-b-2 p-2 border-[var(--table-border)]" : ""
        }`}
        onClick={toggle}
      >
        <h1 className="text-3xl font-bold">{header}</h1>

        {/* Rotate icon with motion */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdKeyboardArrowDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>

      {/* Collapsible with AnimatePresence */}
      <AnimatePresence initial={false}>
        {hasLoaded && isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {descriptions && (
                <p className="font-medium mt-3  ">{descriptions}</p>
              )}
              <div className="py-4 mt-3">
              {children}
              </div>
            
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Container;
