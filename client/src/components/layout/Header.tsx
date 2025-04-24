import React, { useState } from 'react';
import { NotificationIcon } from '@/lib/icons';
import { Input } from '@/components/ui/input';
import { FilterIcon } from '@/lib/icons';

// Use the Jodni logo from the assets directory
const LOGO_PATH = '/assets/images/jodni-logo.png';

interface HeaderProps {
  notificationCount?: number;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  notificationCount = 0,
  onSearch 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <img 
            src={LOGO_PATH} 
            alt="" 
            className="w-9 h-9 mr-2"
          />
          <h1 className="text-xl font-bold text-primary">Jodni</h1>
        </div>
        <div className="flex items-center">
          <button 
            type="button" 
            className="p-2 text-neutral-500 relative" 
            aria-label="Notifications"
          >
            <NotificationIcon size={22} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search for local artisans and products..."
            className="w-full bg-neutral-50 border border-neutral-200 rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-neutral-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button type="button" className="text-primary" aria-label="Filter">
              <FilterIcon size={18} />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
