import React from 'react';
import { motion } from 'framer-motion';

const LoadingFallback = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const dotVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-center">
        {/* Animated spinner with pulse ring */}
        <div className="relative mb-8">
          <motion.div 
            className="w-16 h-16 border-4 border-blue-200 rounded-full border-t-blue-600 mx-auto"
            variants={spinnerVariants}
            animate="animate"
          />
          <motion.div 
            className="absolute inset-0 w-20 h-20 border-2 border-blue-300 rounded-full -top-2 -left-2"
            variants={pulseVariants}
            animate="animate"
          />
        </div>
        
        {/* Loading text with smooth animation */}
        <motion.div className="space-y-3">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            variants={textVariants}
            animate="animate"
          >
            Loading
          </motion.h2>
          <motion.p 
            className="text-slate-600 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Preparing your experience...
          </motion.p>
        </motion.div>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              variants={dotVariants}
              animate="animate"
              custom={i}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Minimal version with smooth entrance
const MinimalLoadingFallback = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="flex flex-col items-center space-y-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div 
          className="w-10 h-10 border-3 border-blue-200 rounded-full border-t-blue-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.span 
          className="text-slate-700 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// Skeleton loader with stagger animation
const SkeletonLoadingFallback = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const shimmerVariants = {
    animate: {
      x: [-100, 100],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative h-8 bg-slate-200 rounded w-1/3 mb-4 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <div className="relative h-4 bg-slate-200 rounded w-2/3 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </motion.div>
        
        {/* Content skeleton */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              className="flex space-x-4"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 bg-slate-200 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <div className="flex-1 space-y-3">
                <div className="relative h-4 bg-slate-200 rounded w-3/4 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
                <div className="relative h-4 bg-slate-200 rounded w-1/2 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    variants={shimmerVariants}
                    animate="animate"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Morphing loader with creative animation
const MorphingLoadingFallback = () => {
  const morphVariants = {
    animate: {
      borderRadius: ["50%", "20%", "50%", "20%", "50%"],
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.2, 1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
          variants={morphVariants}
          animate="animate"
        />
        <motion.h2 
          className="text-2xl font-bold text-gray-700"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Almost there...
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingFallback;
export { MinimalLoadingFallback, SkeletonLoadingFallback, MorphingLoadingFallback };