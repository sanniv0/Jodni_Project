import React from 'react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { StarIcon } from '@/lib/icons';
import { motion } from 'framer-motion';
import { User } from '@shared/schema';

interface SellerCardProps {
  seller: User;
  distance?: string;
  category?: string;
  rating?: number;
}

const SellerCard: React.FC<SellerCardProps> = ({ 
  seller, 
  distance = '5 km', 
  category = 'Artisan',
  rating = 4.5
}) => {
  const getAvatarUrl = () => {
    if (seller.avatar) {
      return seller.avatar;
    }
    // Default image placeholder with seller initials
    const initials = seller.displayName.charAt(0).toUpperCase();
    return `https://placehold.co/60x60/4F7942/ffffff?text=${initials}`;
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const avatarVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 5 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (custom * 0.1),
        duration: 0.3
      }
    })
  };

  return (
    <Link href={`/seller/${seller.id}`}>
      <a className="block">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          <Card className="min-w-[140px] p-3 flex flex-col items-center overflow-visible">
            <motion.img 
              src={getAvatarUrl()} 
              alt={`${seller.displayName}'s avatar`} 
              className="w-14 h-14 rounded-full mb-2"
              variants={avatarVariants}
            />
            <motion.h3 
              className="font-semibold text-sm text-center"
              variants={textVariants}
              custom={0}
            >
              {seller.displayName}
            </motion.h3>
            <motion.p 
              className="text-xs text-neutral-500 text-center"
              variants={textVariants}
              custom={1}
            >
              {category}, {distance}
            </motion.p>
            <motion.div 
              className="flex items-center mt-1"
              variants={textVariants}
              custom={2}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  duration: 1, 
                  repeatDelay: 1
                }}
              >
                <StarIcon className="text-yellow-400 text-xs" size={14} />
              </motion.div>
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
            </motion.div>
          </Card>
        </motion.div>
      </a>
    </Link>
  );
};

export default SellerCard;
