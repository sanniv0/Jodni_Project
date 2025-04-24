import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import StatusBar from '@/components/layout/StatusBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { 
  ArrowLeftIcon, 
  ShareIcon, 
  HeartOutlineIcon, 
  HeartIcon,
  StarIcon,
  TruckIcon,
  MessageIcon,
  MinusIcon,
  PlusIcon,
  CartIcon
} from '@/lib/icons';
import ProductCard from '@/components/product/ProductCard';
import { Product, User } from '@shared/schema';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [_, navigate] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const productId = parseInt(params.id);
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  const { data: seller } = useQuery<User>({
    queryKey: [`/api/users/${product?.sellerId}`],
    enabled: !!product?.sellerId,
  });
  
  // Mock related products data
  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    select: (data) => 
      data.filter(p => p.id !== productId)
          .slice(0, 3),
    enabled: !!product,
  });
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Check out this product',
        text: product?.description || 'I found this amazing product on ArtisanConnect',
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported on this browser');
    }
  };
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} item(s) to cart`);
  };
  
  const handleMessageSeller = () => {
    if (seller) {
      navigate(`/messages/${seller.id}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <StatusBar />
        <div className="flex-grow pb-16">
          <div className="animate-pulse">
            <div className="h-64 bg-neutral-200"></div>
            <div className="bg-white rounded-t-3xl -mt-5 relative p-4">
              <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-5 bg-neutral-200 rounded w-1/4 mb-4"></div>
              {/* Loading placeholders for other content */}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <StatusBar />
        <div className="flex-grow pb-16 flex items-center justify-center">
          <div className="text-center p-4">
            <h1 className="text-xl font-bold text-neutral-800 mb-2">Product Not Found</h1>
            <p className="text-neutral-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Go Back to Home</Button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  // Format product price
  const formatPrice = (price: number) => {
    return `₹${price.toFixed(0)}`;
  };
  
  // Get main product image
  const getMainImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
  };
  
  // Calculate discounted price (10% off for demo)
  const originalPrice = product.price;
  const discountedPrice = product.price * 0.9;
  const discountPercentage = 10;
  
  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      
      <main className="flex-grow pb-20">
        <div className="relative">
          <div className="relative">
            <img 
              src={getMainImage()} 
              alt={product.name} 
              className="w-full h-64 object-cover"
            />
            <button 
              className="absolute top-4 left-4 bg-white text-neutral-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              aria-label="Go back"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon size={18} />
            </button>
            <div className="absolute bottom-4 right-4 flex space-x-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-white rounded-full opacity-60"></span>
              <span className="w-2 h-2 bg-white rounded-full opacity-60"></span>
            </div>
          </div>
          
          <div className="bg-white rounded-t-3xl -mt-5 relative p-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold text-neutral-800">{product.name}</h1>
              <div className="flex items-center">
                <button 
                  className="text-neutral-400 p-1" 
                  aria-label="Share product"
                  onClick={handleShare}
                >
                  <ShareIcon size={20} />
                </button>
                <button 
                  className="text-neutral-400 p-1 ml-2" 
                  aria-label="Save product"
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? (
                    <HeartIcon size={20} className="text-error" />
                  ) : (
                    <HeartOutlineIcon size={20} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <span className="text-lg font-bold text-primary">{formatPrice(discountedPrice)}</span>
              <span className="ml-2 text-sm text-neutral-500 line-through">{formatPrice(originalPrice)}</span>
              <span className="ml-2 bg-secondary-light text-secondary-dark text-xs px-2 py-0.5 rounded">{discountPercentage}% OFF</span>
            </div>
            
            {/* Seller Info */}
            <div className="flex items-center mt-4 bg-neutral-50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                <span className="text-lg font-bold">{seller?.displayName?.charAt(0) || 'S'}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{seller?.displayName || 'Seller Name'}</h3>
                <div className="flex items-center mt-0.5">
                  <div className="flex items-center text-yellow-400">
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                    <StarIcon size={12} />
                  </div>
                  <span className="text-xs text-neutral-500 ml-1">4.7 (124 ratings)</span>
                </div>
              </div>
              <button 
                className="flex items-center justify-center bg-primary text-white rounded-full w-9 h-9 shadow-sm"
                onClick={handleMessageSeller}
              >
                <MessageIcon size={18} />
              </button>
            </div>
            
            {/* Product Details */}
            <div className="mt-4">
              <h3 className="font-semibold text-neutral-800 mb-2">Product Details</h3>
              <p className="text-sm text-neutral-600">
                {product.description || 'No description provided for this product.'}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="text-xs text-neutral-500">Quantity</p>
                  <p className="text-sm font-medium">{product.quantity} available</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="text-xs text-neutral-500">Category</p>
                  <p className="text-sm font-medium">Handicrafts</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="text-xs text-neutral-500">Made in</p>
                  <p className="text-sm font-medium">{product.location || 'India'}</p>
                </div>
                <div className="bg-neutral-50 p-2 rounded">
                  <p className="text-xs text-neutral-500">Availability</p>
                  <p className="text-sm font-medium text-success">In Stock</p>
                </div>
              </div>
            </div>
            
            {/* Delivery Options */}
            <div className="mt-4">
              <h3 className="font-semibold text-neutral-800 mb-2">Delivery Options</h3>
              <div className="flex items-center bg-neutral-50 p-3 rounded-lg">
                <TruckIcon className="text-primary mr-3" size={20} />
                <div className="flex-1">
                  <p className="text-sm">Estimated delivery time</p>
                  <p className="text-sm font-medium">2-4 days</p>
                </div>
                <span className="text-sm text-secondary font-medium">₹40</span>
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-neutral-800 mb-2">You May Also Like</h3>
                <div className="flex overflow-x-auto space-x-3 pb-2">
                  {relatedProducts.map(relatedProduct => (
                    <div key={relatedProduct.id} className="min-w-[120px]">
                      <img 
                        src={relatedProduct.images && relatedProduct.images[0] ? 
                          relatedProduct.images[0] : 
                          'https://placehold.co/120x120/e2e8f0/1e293b?text=Product'}
                        alt={relatedProduct.name} 
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="p-2">
                        <h4 className="text-xs font-semibold truncate">{relatedProduct.name}</h4>
                        <p className="text-xs text-primary font-medium mt-1">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Product Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="w-10 h-10 border border-neutral-300 rounded-lg flex items-center justify-center" 
            aria-label="Decrease quantity"
            onClick={handleDecrease}
          >
            <MinusIcon size={18} />
          </button>
          <span className="mx-3 font-medium">{quantity}</span>
          <button 
            className="w-10 h-10 border border-neutral-300 rounded-lg flex items-center justify-center" 
            aria-label="Increase quantity"
            onClick={handleIncrease}
          >
            <PlusIcon size={18} />
          </button>
        </div>
        <Button 
          className="bg-primary text-white py-3 px-6 rounded-lg font-semibold flex-1 ml-4 flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <CartIcon className="mr-2" size={18} />
          Add to Cart
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProductDetailPage;
