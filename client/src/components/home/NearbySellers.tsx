import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import SellerCard from '@/components/product/SellerCard';
import { MapPinIcon } from '@/lib/icons';
import { User } from '@shared/schema';
import { motion } from 'framer-motion';
import AnimatedContainer from '@/components/ui/animated-container';
import StaggeredContainer from '@/components/ui/staggered-container';

const NearbySellers: React.FC = () => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
    // Mock data for demo, in real app would use actual API
    initialData: [],
  });

  if (isLoading) {
    return (
      <section className="mt-6 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-neutral-800">Nearby Sellers</h2>
          <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[140px] bg-white rounded-lg shadow-sm p-3">
                <div className="w-14 h-14 rounded-full bg-neutral-200 animate-pulse mx-auto mb-2"></div>
                <div className="w-full h-4 bg-neutral-200 animate-pulse rounded mb-2 mx-auto"></div>
                <div className="w-2/3 h-3 bg-neutral-200 animate-pulse rounded mb-2 mx-auto"></div>
                <div className="w-10 h-3 bg-neutral-200 animate-pulse rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no users, we'll render a placeholder with the proper User type
  const placeholders: User[] = [
    { 
      id: 1, 
      displayName: 'Lakshmi Crafts', 
      username: 'lakshmi', 
      password: 'password', 
      avatar: 'https://placehold.co/60x60/4F7942/ffffff?text=L',
      location: null,
      isVerified: null,
      joinedDate: null,
      phone: null
    },
    { 
      id: 2, 
      displayName: 'Raj Farms', 
      username: 'raj', 
      password: 'password', 
      avatar: 'https://placehold.co/60x60/4F7942/ffffff?text=R',
      location: null,
      isVerified: null,
      joinedDate: null,
      phone: null
    },
    { 
      id: 3, 
      displayName: 'Meena Textiles', 
      username: 'meena', 
      password: 'password', 
      avatar: 'https://placehold.co/60x60/4F7942/ffffff?text=M',
      location: null,
      isVerified: null,
      joinedDate: null,
      phone: null
    }
  ];

  const sellers = users.length ? users : placeholders;

  return (
    <AnimatedContainer 
      className="mt-6 px-4" 
      animation="slideUp"
      duration={0.5}
      delay={0.2}
    >
      <motion.div 
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.h2 
          className="text-lg font-bold text-neutral-800"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Nearby Sellers
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ x: 5 }}
        >
          <Link href="/sellers">
            <a className="text-sm text-primary flex items-center">
              View Map
              <motion.div 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <MapPinIcon className="ml-1" size={16} />
              </motion.div>
            </a>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div 
        className="overflow-x-auto pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <StaggeredContainer 
          className="flex space-x-4" 
          animation="scale"
          staggerDelay={0.15}
        >
          {sellers.map((seller, index) => (
            <motion.div
              key={seller.id}
              whileHover={{ 
                y: -5, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.2 }
              }}
            >
              <SellerCard 
                seller={seller} 
                distance={`${index + 3} km`}
                category={index === 0 ? 'Pottery' : index === 1 ? 'Agriculture' : 'Handloom'}
                rating={4.5 + (index * 0.1)}
              />
            </motion.div>
          ))}
        </StaggeredContainer>
      </motion.div>
    </AnimatedContainer>
  );
};

export default NearbySellers;
