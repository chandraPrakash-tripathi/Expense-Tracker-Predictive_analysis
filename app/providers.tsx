// app/providers.tsx
"use client";

import { ClerkProvider } from '@clerk/nextjs'

import { store } from "./redux/store"; // We'll create this store next
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  
  return (
    <ClerkProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </ClerkProvider>
  );
}
