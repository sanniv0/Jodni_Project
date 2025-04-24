import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonClick
}) => {
  const bannerVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95
    }
  };

  return (
    <motion.div 
      className="mx-4 my-3 rounded-lg overflow-hidden relative"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={bannerVariants}
    >
      <motion.div 
        className="w-full h-36 bg-gradient-to-r from-primary to-primary-light/40"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      ></motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex flex-col justify-end p-4">
        <motion.h2 
          className="text-white text-lg font-bold"
          variants={textVariants}
          custom={0}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-white text-sm"
          variants={textVariants}
          custom={1}
        >
          {subtitle}
        </motion.p>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            className="mt-2 bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm inline-block w-max"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PromotionalBanner;
