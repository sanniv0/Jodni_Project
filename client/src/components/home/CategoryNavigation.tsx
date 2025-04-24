import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  PlantIcon,
  HandCoinIcon,
  TShirtIcon,
  CopperCoinIcon,
  HammerIcon,
  MoreIcon
} from '@/lib/icons';
import { motion } from 'framer-motion';
import StaggeredContainer from '@/components/ui/staggered-container';
import type { Category } from '@shared/schema';

interface CategoryIconProps {
  name: string;
  icon: string;
  color: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, icon, color }) => {
  const getIcon = () => {
    switch (icon) {
      case 'plant-line':
        return <PlantIcon className="text-2xl" />;
      case 'hand-coin-line':
        return <HandCoinIcon className="text-2xl" />;
      case 't-shirt-line':
        return <TShirtIcon className="text-2xl" />;
      case 'copper-coin-line':
        return <CopperCoinIcon className="text-2xl" />;
      case 'hammer-line':
        return <HammerIcon className="text-2xl" />;
      default:
        return <MoreIcon className="text-2xl" />;
    }
  };

  const iconVariants = {
    hover: { 
      y: -3, 
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    },
    tap: { 
      scale: 0.95, 
      transition: { 
        duration: 0.1 
      }
    },
    initial: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-w-[4.5rem]"
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      animate="animate"
      variants={iconVariants}
    >
      <motion.div 
        className="category-icon"
        style={{ backgroundColor: color }}
        variants={iconVariants}
      >
        {getIcon()}
      </motion.div>
      <motion.span 
        className="text-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

const CategoryNavigation: React.FC = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Colors for the category icons
  const colors = [
    'var(--primary-light, #6B9362)',  // Green
    'var(--secondary, #F5A623)',      // Yellow
    'var(--success, #10B981)',        // Teal
    'var(--warning, #F59E0B)',        // Orange
    'var(--error, #EF4444)',          // Red
    'var(--neutral-500, #6B7280)'     // Gray
  ];

  if (isLoading) {
    return (
      <div className="overflow-x-auto px-2 py-4 bg-white">
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center min-w-[4.5rem]">
              <div className="w-14 h-14 rounded-full bg-neutral-200 animate-pulse mb-1"></div>
              <div className="w-12 h-3 bg-neutral-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="overflow-x-auto px-2 py-4 bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StaggeredContainer 
        className="flex space-x-4" 
        animation="slideUp"
        staggerDelay={0.05}
      >
        {categories?.map((category, index) => (
          <CategoryIcon 
            key={category.id} 
            name={category.name} 
            icon={category.icon}
            color={colors[index % colors.length]}
          />
        ))}
        {/* More button */}
        <motion.div 
          className="flex flex-col items-center min-w-[4.5rem]"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className="category-icon bg-neutral-500"
            whileHover={{ 
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <MoreIcon className="text-2xl" />
          </motion.div>
          <span className="text-xs text-center">More</span>
        </motion.div>
      </StaggeredContainer>
    </motion.div>
  );
};

export default CategoryNavigation;
