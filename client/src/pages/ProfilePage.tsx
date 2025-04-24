import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StatusBar from '@/components/layout/StatusBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  StoreIcon, 
  WalletIcon, 
  SettingsIcon, 
  LogoutIcon,
  WifiOffIcon
} from '@/lib/icons';
import { useConnection } from '@/hooks/useConnection';
import type { User } from '@shared/schema';

const ProfilePage: React.FC = () => {
  const { isOnline, toggleOfflineMode } = useConnection();
  
  // Assuming user ID 1 for demo
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/users/1'],
    // Mock user data for demo
    initialData: {
      id: 1,
      username: 'rajesh',
      password: '*****',
      displayName: 'Rajesh Kumar',
      location: 'Rajasthan, India',
      avatar: 'https://placehold.co/100x100/4F7942/ffffff?text=R',
      isVerified: true,
      joinedDate: new Date(),
      phone: '+91 98765 43210'
    }
  });
  
  // Mock data for stats
  const stats = {
    orders: 8,
    products: 12,
    earnings: 4500
  };
  
  const getAvatarUrl = () => {
    if (user?.avatar) {
      return user.avatar;
    }
    // Default image placeholder with user initials
    const initials = user?.displayName?.charAt(0).toUpperCase() || 'U';
    return `https://placehold.co/100x100/4F7942/ffffff?text=${initials}`;
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logout functionality
    alert('Logout functionality would be implemented here');
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <StatusBar />
        <div className="flex-1 animate-pulse">
          <div className="bg-primary pt-6 pb-8 px-4 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/30"></div>
            <div className="h-5 w-32 bg-white/30 rounded mt-2"></div>
            <div className="h-4 w-24 bg-white/30 rounded mt-1"></div>
            <div className="h-8 w-32 bg-white/30 rounded-full mt-3"></div>
          </div>
          
          <div className="bg-white shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-neutral-100">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 text-center">
                  <div className="h-6 w-8 mx-auto bg-neutral-200 rounded"></div>
                  <div className="h-3 w-12 mx-auto bg-neutral-200 rounded mt-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      
      <div className="flex-1">
        <div className="bg-primary">
          <div className="pt-6 pb-8 px-4 flex flex-col items-center">
            <img 
              src={getAvatarUrl()} 
              alt="Profile Photo" 
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <h1 className="text-white font-bold text-lg mt-2">{user.displayName}</h1>
            <p className="text-white text-opacity-80 text-sm">{user.location}</p>
            <Button 
              className="mt-3 bg-white text-primary px-4 py-1.5 rounded-full text-sm font-medium h-auto"
            >
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Stats Panel */}
        <div className="bg-white shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-neutral-100">
            <div className="p-3 text-center">
              <p className="text-lg font-bold text-primary">{stats.orders}</p>
              <p className="text-xs text-neutral-500">Orders</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-lg font-bold text-primary">{stats.products}</p>
              <p className="text-xs text-neutral-500">Products</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-lg font-bold text-primary">₹{(stats.earnings / 1000).toFixed(1)}K</p>
              <p className="text-xs text-neutral-500">Earnings</p>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <StoreIcon className="text-primary" size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">My Shop</h3>
                <p className="text-xs text-neutral-500">Manage your products and shop</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-4 border-b border-neutral-100 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <WalletIcon className="text-primary" size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Earnings & Payments</h3>
                <p className="text-xs text-neutral-500">Track earnings and withdraw money</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-4 border-b border-neutral-100 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <SettingsIcon className="text-primary" size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Settings</h3>
                <p className="text-xs text-neutral-500">App preferences and account settings</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-4 flex items-center" onClick={handleLogout}>
              <div className="w-8 h-8 rounded-full bg-error bg-opacity-10 flex items-center justify-center mr-3">
                <LogoutIcon className="text-error" size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-error">Log Out</h3>
              </div>
            </div>
          </div>
          
          {/* Offline Mode */}
          <div className="mt-4 bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <WifiOffIcon className="text-neutral-600 mr-2" size={18} />
                <span className="font-medium text-sm">Offline Mode</span>
              </div>
              <Switch
                checked={!isOnline}
                onCheckedChange={toggleOfflineMode}
                aria-label="Toggle offline mode"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">Browse and manage your products offline</p>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500">ArtisanConnect v1.0.2</p>
            <p className="text-xs text-neutral-500 mt-1">© 2023 All Rights Reserved</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
