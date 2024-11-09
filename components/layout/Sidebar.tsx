// components/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Account", href: "/pages/account" },
  { name: "Dashboard", href: "/pages/dashboard" },
  { name: "Transaction", href: "/pages/transactions" },
  { name: "Prediction", href: "/pages/prediction" },
  { name: "Profile", href: "/profile" },
  { name: "Register", href: "/register" },
  
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-blue-950 text-white fixed top-0 left-0 z-10 flex flex-col pt-20">
      <nav className="space-y-4 px-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block py-2 px-4 rounded-md transition-colors duration-200 ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
