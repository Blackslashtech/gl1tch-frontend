"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconDashboard, IconCalendarEvent, IconSword, IconUsers, IconChartBar, IconSettings } from "@tabler/icons-react";

const AuthenticatedHeader = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <IconDashboard />, href: "/dashboard" },
    { name: "Events", icon: <IconCalendarEvent />, href: "/events" },
    { name: "Live Event", icon: <IconSword />, href: "/live-event" },
    { name: "Manage Groups", icon: <IconUsers />, href: "/manage-groups" },
    { name: "Analytics", icon: <IconChartBar />, href: "/analytics" },
    { name: "Profile", icon: <IconSettings />, href: "/profile" },
  ];

  return (
    <header className="bg-background/90 py-4 fixed top-0 w-full border-primary-dark border-b-05 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link href="/dashboard">
          <h1 className="font-audiowide text-foreground text-2xl">GL1TCH</h1>
        </Link>
        <nav className="relative">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2"
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
                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log Out
                  </Button>
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