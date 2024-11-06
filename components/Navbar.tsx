import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='bg-blue-900 text-white shadow-lg p-4'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <h2 className='text-2xl font-bold'>Expense Tracker</h2>
        <div className='flex items-center space-x-4 font-bold text-2xl'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
