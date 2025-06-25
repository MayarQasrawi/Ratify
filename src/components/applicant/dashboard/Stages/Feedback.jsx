import Container from '../general/Container';
import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdExpandMore, MdExpandLess } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import useGetFeedback from '@/hooks/applicant/Feedback/useGetFeedback';

function Feedback({ id, stagePassingScore }) {
  const { data, isLoading, error } = useGetFeedback(id);
  const [feedback, setFeedback] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  
  console.log("feedback", data)
  
  useEffect(() => {
    if (data) {
      setFeedback(data);
    }
  }, [data]);

  const toggleSection = (key) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpanded(null); // Reset individual expanded state
  };

  // Function to parse text and convert URLs to clickable links
  const parseTextWithLinks = (text) => {
    if (!text) return text;
    
    // Regular expression to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const border = "rounded-lg p-4 border-2 border-[var(--table-border)]";

  if (isLoading) return <div>Loading feedback...</div>;
  if (error) return <div>Failed to load feedback.</div>;
  if (!id || !feedback) return <div>No Feedback!</div>;

  const { totalScore, comments, detailedFeedbacks } = feedback;

  return (
    <Container
      Open={true}
      header="Score & Feedback"
    >
      <div className="flex flex-col gap-4 mt-4">
        {/* Score */}
        <div className={border}>
          <div className="text-[var(--text-color)] font-medium flex justify-between items-center">
            <span>
              Your Score <span className={`${totalScore >= stagePassingScore ? "text-green-600" : "text-red-600"} ml-5`}>{totalScore}/100</span>
            </span>
            <span className={`${totalScore >= stagePassingScore ? "bg-green-600" : "bg-red-600"} text-white font-medium text-md px-8 py-1 rounded-lg`}>
              {totalScore >= stagePassingScore ? "Pass" : "Failed"}
            </span>
          </div>
        </div>

        {/* General Feedback */}
        <div className={`${border} flex flex-col text-[var(--text-color)] gap-2`}>
          <h1 className="font-medium">Feedback</h1>
          <p className="font-light">"{parseTextWithLinks(comments)}"</p>
        </div>

        {/* Detailed Feedback */}
        {detailedFeedbacks && (
          <>
            <div className="flex justify-between items-center mt-4">
              <h1 className='font-bold text-xl text-[var(--secondary-color)]'>Detailed Feedback</h1>
              
              {/* Expand All Button */}
              <button
                onClick={toggleExpandAll}
                className="flex items-center gap-2 px-4 py-2  text-black rounded-lg hover:bg-[var(--main-color)] transition-colors duration-200"
              >
                {expandAll ? (
                  <>
                    <MdExpandLess className="w-5 h-5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <MdExpandMore className="w-5 h-5" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {Object.entries(detailedFeedbacks).map(([key, value]) => {
                const isOpen = expandAll || expanded === key;
                return (
                  <div
                    key={key}
                    className={`rounded-lg border-[var(--table-border)] border-2 ${isOpen ? "shadow" : ""}`}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer p-4"
                      onClick={() => !expandAll && toggleSection(key)}
                    >
                      <h2 className="font-semibold text-[var(--text-color)]">{value.criterionName}</h2>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MdKeyboardArrowDown 
                          className={`w-6 h-6 text-gray-600 ${expandAll ? 'opacity-50' : ''}`} 
                        />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
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
                          className="overflow-hidden px-4 pb-4"
                        >
                          <div className="text-sm text-[var(--text-color)] space-y-2 p-2">
                            <p>
                              <span className="font-medium bg-black/80 px-6 py-0.5 text-white rounded-lg">
                                {value.score}/{value.criterionWeight}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium">Comments:</span> {parseTextWithLinks(value.comments)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        )} 
      </div>
    </Container>
  );
}

export default Feedback;