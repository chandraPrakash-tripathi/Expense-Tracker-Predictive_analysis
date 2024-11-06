import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-blue-800 md:flex-row flex-col p-8 md:p-4 border-t-4 text-white text-center fixed inset-x-0 bottom-0 z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Expense Tracker</p>

          
          <div className="space-x-6">
            <a href="/about" className="text-sm hover:text-blue-300 transition duration-300">About</a>
            <a href="/privacy" className="text-sm hover:text-blue-300 transition duration-300">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-blue-300 transition duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
