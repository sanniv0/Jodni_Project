import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRightIcon } from '@/lib/icons';
import { Product } from '@shared/schema';
import { motion } from 'framer-motion';
import AnimatedContainer from '@/components/ui/animated-container';
import StaggeredContainer from '@/components/ui/staggered-container';

const RecentProducts: React.FC = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    select: (data) => {
      // Sort by dateAdded (newest first) and take first 3
      return [...data]
        .sort((a, b) => new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime())
        .slice(0, 3);
    },
  });
  
  if (isLoading) {
    return (
      <section className="mt-6 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-neutral-800">New Arrivals</h2>
          <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
        </div>
        <div className="flex flex-col space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden flex">
              <div className="w-24 h-24 bg-neutral-200 animate-pulse"></div>
              <div className="p-2 flex-1">
                <div className="w-full h-4 bg-neutral-200 animate-pulse rounded mb-2"></div>
                <div className="w-2/3 h-3 bg-neutral-200 animate-pulse rounded mb-3"></div>
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
                  <div className="w-12 h-6 bg-neutral-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  if (!products?.length) {
    return null; // Don't show the section if there are no products
  }

  return (
    <AnimatedContainer 
      className="mt-6 px-4" 
      animation="slideUp"
      duration={0.5}
    >
      <motion.div 
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.h2 
          className="text-lg font-bold text-neutral-800"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          New Arrivals
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ x: 5 }}
        >
          <Link href="/products?sort=newest">
            <a className="text-sm text-primary flex items-center">
              View All
              <motion.div 
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRightIcon className="ml-1" size={16} />
              </motion.div>
            </a>
          </Link>
        </motion.div>
      </motion.div>
      <StaggeredContainer 
        className="flex flex-col space-y-3" 
        animation="slideIn"
        staggerDelay={0.1}
      >
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} variant="list" />
          </div>
        ))}
      </StaggeredContainer>
    </AnimatedContainer>
  );
};

export default RecentProducts;
