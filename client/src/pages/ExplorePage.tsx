import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StatusBar from '@/components/layout/StatusBar';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import CategoryNavigation from '@/components/home/CategoryNavigation';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Product, Category } from '@shared/schema';

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: selectedCategory 
      ? [`/api/products/category/${selectedCategory}`] 
      : ['/api/products'],
  });
  
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : 'All Products';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      <Header />
      
      <main className="flex-grow pb-16">
        <CategoryNavigation />
        
        <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-neutral-100">
          <h2 className="text-lg font-semibold">
            {selectedCategory ? getCategoryName(selectedCategory) : 'All Products'}
          </h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`p-1 h-8 w-8 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-neutral-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`p-1 h-8 w-8 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-neutral-500'}`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`bg-white rounded-lg shadow-sm overflow-hidden animate-pulse ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={viewMode === 'grid' ? 'w-full h-36 bg-neutral-200' : 'w-24 h-24 bg-neutral-200'}></div>
                <div className="p-2 flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2 mb-2"></div>
                  {viewMode === 'list' && (
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-neutral-200 rounded w-16"></div>
                      <div className="h-6 bg-neutral-200 rounded w-16"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {products && products.length > 0 ? (
              <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant={viewMode}
                    onAddToCart={() => alert(`Added ${product.name} to cart`)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 h-64">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-800">No Products Found</h3>
                <p className="text-neutral-500 text-sm text-center mt-1">
                  There are no products in this category yet.
                </p>
                {selectedCategory && (
                  <Button 
                    className="mt-4 bg-primary text-white"
                    onClick={() => setSelectedCategory(null)}
                  >
                    View All Products
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ExplorePage;
