import React, { useState } from 'react';
import { useLocation } from 'wouter';
import StatusBar from '@/components/layout/StatusBar';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import CategoryNavigation from '@/components/home/CategoryNavigation';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NearbySellers from '@/components/home/NearbySellers';
import RecentProducts from '@/components/home/RecentProducts';

const HomePage: React.FC = () => {
  const [_, setLocation] = useLocation();
  const [notificationCount] = useState(2);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleExploreClick = () => {
    setLocation('/explore');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      <Header 
        notificationCount={notificationCount}
        onSearch={handleSearch}
      />
      
      <main className="flex-grow pb-16">
        <div id="home-screen">
          <CategoryNavigation />
          
          <PromotionalBanner 
            title="Discover Local Artisans with Jodni"
            subtitle="Connect directly with skilled creators in your area"
            buttonText="Explore"
            onButtonClick={handleExploreClick}
          />
          
          <FeaturedProducts />
          
          <NearbySellers />
          
          <RecentProducts />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
