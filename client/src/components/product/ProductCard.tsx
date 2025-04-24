import React from 'react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { CartIcon } from '@/lib/icons';
import { motion } from 'framer-motion';
import { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'grid',
  onAddToCart
}) => {
  // Format price to local currency
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(0)}`;
  };

  // Get first image from the product images array
  const getMainImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    // Default image placeholder
    return 'https://placehold.co/300x200/e2e8f0/1e293b?text=No+Image';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.15 }
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  if (variant === 'list') {
    return (
      <Link href={`/product/${product.id}`}>
        <a className="block">
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <Card className="overflow-hidden flex mb-3">
              <motion.img 
                src={getMainImage()} 
                alt={product.name} 
                className="w-24 h-24 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 rounded-full bg-neutral-300 mr-1"></div>
                    <span className="text-xs text-neutral-500">Seller Name</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
                  <motion.button 
                    className="text-xs bg-primary text-white px-2 py-1 rounded flex items-center"
                    onClick={handleAddToCart}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <CartIcon size={14} className="mr-1" />
                    Add
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`}>
      <a className="block">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          <Card className="overflow-hidden h-full">
            <div className="relative">
              <motion.img 
                src={getMainImage()} 
                alt={product.name} 
                className="w-full h-36 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute top-2 right-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {formatPrice(product.price)}
              </motion.span>
            </div>
            <div className="p-2">
              <motion.h3 
                className="font-semibold text-sm truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {product.name}
              </motion.h3>
              <motion.div 
                className="flex items-center mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-4 h-4 rounded-full bg-neutral-300 mr-1"></div>
                <span className="text-xs text-neutral-500 truncate">Seller Name</span>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </a>
    </Link>
  );
};

export default ProductCard;
