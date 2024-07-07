"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconDashboard, IconCalendarEvent, IconSword, IconUsers, IconChartBar, IconSettings, IconLogout } from "@tabler/icons-react";

const AuthenticatedHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <IconDashboard />, href: "/dashboard" },
    { name: "Events", icon: <IconCalendarEvent />, href: "/events" },
    { name: "Live Event", icon: <IconSword />, href: "/live-event" },
    { name: "Manage Groups", icon: <IconUsers />, href: "/manage-groups" },
    { name: "Stats", icon: <IconChartBar />, href: "/stats" },
    { name: "Profile", icon: <IconSettings />, href: "/profile" },
  ];

  return (
    <header className="bg-gray-900 py-6 fixed top-0 w-full border-b border-gray-800 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <Link href="/dashboard">
          <h1 className="font-audiowide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-3xl">GL1TCH</h1>
        </Link>
        <nav className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <span>Menu</span>
            <IconChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <IconLogout />
                    <span className="ml-2">Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;