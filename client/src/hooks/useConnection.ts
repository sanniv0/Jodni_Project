import { useState, useEffect } from 'react';

interface ConnectionState {
  isOnline: boolean;
  lastSynced: string | null;
}

export const useConnection = () => {
  const [connection, setConnection] = useState<ConnectionState>({
    isOnline: navigator.onLine,
    lastSynced: null,
  });

  useEffect(() => {
    const handleOnline = () => {
      setConnection(prev => ({ 
        ...prev, 
        isOnline: true,
        lastSynced: new Date().toISOString()
      }));
    };
    
    const handleOffline = () => {
      setConnection(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial sync time if online
    if (navigator.onLine) {
      setConnection(prev => ({ 
        ...prev, 
        lastSynced: new Date().toISOString() 
      }));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOfflineMode = () => {
    // This is a simulated offline mode toggle
    // In a real app, this would manage the app's behavior in offline mode
    setConnection(prev => ({ 
      ...prev, 
      isOnline: !prev.isOnline,
      lastSynced: prev.isOnline ? prev.lastSynced : new Date().toISOString()
    }));
  };

  const getFormattedLastSynced = () => {
    if (!connection.lastSynced) return 'Never';
    
    const syncDate = new Date(connection.lastSynced);
    const now = new Date();
    
    const diffInMinutes = Math.floor((now.getTime() - syncDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return syncDate.toLocaleDateString();
  };

  return {
    isOnline: connection.isOnline,
    lastSynced: connection.lastSynced,
    formattedLastSynced: getFormattedLastSynced(),
    toggleOfflineMode,
  };
};
