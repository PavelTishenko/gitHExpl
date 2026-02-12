import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export function setupNetworkListener() {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });
}

export function useNetworkStatus() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return unsubscribe;
  }, []);

  return { isOffline };
}
