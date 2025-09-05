import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

// React Query setup tuned for React Native
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    },
  },
});

// Tie focus state to AppState for RN
focusManager.setEventListener((handleFocus) => {
  const listener = AppState.addEventListener('change', (state) => {
    handleFocus(state === 'active');
  });
  return () => listener.remove();
});

// Optionally manage online state using NetInfo if needed in future
// onlineManager.setEventListener((setOnline) => { ... })

export function AppQueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

