'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import type React from 'react';

interface RootWrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function RootWrapper({ children }: RootWrapperProps) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="490381879-9976i94b3vvu2pabjttjgma8hscajrin.apps.googleusercontent.com">
          <div className="flex justify-center items-center w-full">{children}</div>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
