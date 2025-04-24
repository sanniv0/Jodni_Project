import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRightIcon } from '@/lib/icons';
import { Product } from '@shared/schema';
import { motion } from 'framer-motion';
import StaggeredContainer from '@/components/ui/staggered-container';

const FeaturedProducts: React.FC = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    select: (data) => data.slice(0, 4), // Only get the first 4 products
  });

  if (isLoading) {
    return (
      <section className="mt-4 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-neutral-800">Featured Products</h2>
          <div className="w-16 h-4 bg-neutral-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-36 bg-neutral-200 animate-pulse"></div>
              <div className="p-2">
                <div className="w-full h-4 bg-neutral-200 animate-pulse rounded mb-2"></div>
                <div className="w-2/3 h-3 bg-neutral-200 animate-pulse rounded"></div>
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
    <motion.section 
      className="mt-4 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2 
          className="text-lg font-bold text-neutral-800"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Featured Products
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ x: 5 }}
        >
          <Link href="/products">
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
      <StaggeredContainer animation="slideUp" className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </StaggeredContainer>
    </motion.section>
  );
};

export default FeaturedProducts;
