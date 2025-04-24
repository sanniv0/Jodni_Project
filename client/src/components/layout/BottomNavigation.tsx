import React from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ExploreIcon, 
  AddIcon, 
  OrdersIcon, 
  ProfileIcon 
} from '@/lib/icons';

const BottomNavigation: React.FC = () => {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const navVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    tap: { 
      scale: 0.9, 
      transition: { duration: 0.1 } 
    }
  };

  const activeIndicator = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const floatingButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: 0.3
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.9,
      transition: { 
        duration: 0.1 
      }
    }
  };

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-40"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="flex justify-around">
        <Link href="/">
          <a className={`nav-item ${isActive('/') ? 'nav-item-active' : 'nav-item-inactive'}`}>
            <motion.div 
              variants={itemVariants} 
              whileTap="tap"
              className="flex flex-col items-center"
            >
              <div className="relative">
                <HomeIcon size={22} />
                <AnimatePresence>
                  {isActive('/') && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      variants={activeIndicator}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs mt-1">Home</span>
            </motion.div>
          </a>
        </Link>
        
        <Link href="/explore">
          <a className={`nav-item ${isActive('/explore') ? 'nav-item-active' : 'nav-item-inactive'}`}>
            <motion.div 
              variants={itemVariants} 
              whileTap="tap"
              className="flex flex-col items-center"
            >
              <div className="relative">
                <ExploreIcon size={22} />
                <AnimatePresence>
                  {isActive('/explore') && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      variants={activeIndicator}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs mt-1">Explore</span>
            </motion.div>
          </a>
        </Link>
        
        <Link href="/sell">
          <a className="nav-item text-neutral-400 relative">
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="add-product-btn"
                variants={floatingButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <AddIcon className="text-white text-xl" />
              </motion.div>
              <span className="text-xs mt-1">Sell</span>
            </motion.div>
          </a>
        </Link>
        
        <Link href="/orders">
          <a className={`nav-item ${isActive('/orders') ? 'nav-item-active' : 'nav-item-inactive'}`}>
            <motion.div 
              variants={itemVariants} 
              whileTap="tap"
              className="flex flex-col items-center"
            >
              <div className="relative">
                <OrdersIcon size={22} />
                <AnimatePresence>
                  {isActive('/orders') && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      variants={activeIndicator}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs mt-1">Orders</span>
            </motion.div>
          </a>
        </Link>
        
        <Link href="/profile">
          <a className={`nav-item ${isActive('/profile') ? 'nav-item-active' : 'nav-item-inactive'}`}>
            <motion.div 
              variants={itemVariants} 
              whileTap="tap"
              className="flex flex-col items-center"
            >
              <div className="relative">
                <ProfileIcon size={22} />
                <AnimatePresence>
                  {isActive('/profile') && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      variants={activeIndicator}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs mt-1">Profile</span>
            </motion.div>
          </a>
        </Link>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
