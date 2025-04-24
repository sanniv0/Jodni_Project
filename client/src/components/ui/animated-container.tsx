import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type AnimatedContainerProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'bounce';
} & HTMLMotionProps<'div'>;

const getAnimationVariants = (animation: string, duration: number = 0.5) => {
  switch (animation) {
    case 'fadeIn':
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration }
        }
      };
    case 'slideUp':
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration }
        }
      };
    case 'slideIn':
      return {
        hidden: { opacity: 0, x: -20 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { duration }
        }
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { duration }
        }
      };
    case 'bounce':
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 24 
          }
        }
      };
    default:
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration }
        }
      };
  }
};

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  animation = 'fadeIn',
  ...props
}) => {
  const variants = getAnimationVariants(animation, duration);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;