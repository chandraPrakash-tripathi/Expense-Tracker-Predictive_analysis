// components/layout/Design.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Design: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar should take a fixed width and full height */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 z-20">
        <Sidebar />
      </div>

      {/* Main container to the right of sidebar */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">
          {children}
        </main>
        
        <footer className="z-10">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Design;
