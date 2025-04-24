import React from 'react';
import { useConnection } from '@/hooks/useConnection';
import { WifiIcon, WifiOffIcon, RefreshIcon, TranslateIcon } from '@/lib/icons';

interface StatusBarProps {
  currentLanguage?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentLanguage = 'EN' }) => {
  const { isOnline, formattedLastSynced } = useConnection();
  
  return (
    <div className="bg-primary text-white text-xs px-4 py-1 flex justify-between items-center">
      <div className="flex items-center">
        <span className="flex items-center">
          {isOnline ? (
            <WifiIcon className="mr-1" size={14} />
          ) : (
            <WifiOffIcon className="mr-1" size={14} />
          )}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </span>
      </div>
      <div className="flex items-center">
        <span className="flex items-center mr-2">
          <RefreshIcon className="mr-1" size={14} />
          <span>{formattedLastSynced}</span>
        </span>
        <span className="flex items-center">
          <TranslateIcon size={14} />
          <span className="ml-1">{currentLanguage}</span>
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
