"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconCalendarEvent, IconSword, IconBuildingCommunity, IconUsers, IconUser, IconChartBar, IconClock } from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

const dashboardItems = [
  {
    title: "Upcoming Events",
    description: "View and manage your upcoming events.",
    link: "/events",
    icon: <IconCalendarEvent className="w-10 h-10" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Start Training",
    description: "Begin a new training session.",
    link: "/start-training",
    icon: <IconSword className="w-10 h-10" />,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Custom Training",
    description: "Create and manage custom training sessions.",
    link: "/custom-training",
    icon: <IconBuildingCommunity className="w-10 h-10" />,
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Manage Groups",
    description: "Create and manage groups.",
    link: "/manage-groups",
    icon: <IconUsers className="w-10 h-10" />,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    title: "Manage Profile",
    description: "Update your profile information.",
    link: "/profile",
    icon: <IconUser className="w-10 h-10" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    title: "Player Stats",
    description: "View your game statistics.",
    link: "/stats",
    icon: <IconChartBar className="w-10 h-10" />,
    color: "from-indigo-400 to-indigo-600",
  },
];

const Dashboard = () => {
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);
  const [userName, setUserName] = useState("");
  const [userStats, setUserStats] = useState({
    totalGamesPlayed: 0,
    gamesWon: 0,
    teamServiceHoursUsed: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
          setUserName(user.displayName || user.email);
          // Fetch user stats from your backend here
          fetchUserStats(user.uid);
        } else {
          console.log("no user found");
          router.push("/");
        }
      });
    };

    checkAuth();
  }, [router]);

  const fetchUserStats = async (userId) => {
    // This is a placeholder. Replace with actual API call to your backend
    // const response = await fetch(`/api/user-stats/${userId}`);
    // const data = await response.json();
    // setUserStats(data);

    // Placeholder data
    setUserStats({
      totalGamesPlayed: 50,
      gamesWon: 30,
      teamServiceHoursUsed: 75,
      upcomingEvents: 2,
    });
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (isUserValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24 relative">
          <BackgroundBeams />
          <motion.h1 
            className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, {userName}!
          </motion.h1>

          {/* Quick Stats Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Total Games Played</h3>
              <p className="text-3xl font-bold">{userStats.totalGamesPlayed}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Games Won</h3>
              <p className="text-3xl font-bold">{userStats.gamesWon}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Team-Service Hours Used</h3>
              <p className="text-3xl font-bold">{userStats.teamServiceHoursUsed}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
              <p className="text-3xl font-bold">{userStats.upcomingEvents}</p>
            </div>
          </motion.div>

          {/* Main Navigation Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {dashboardItems.map((item, index) => (
              <motion.div key={index} className="col-span-1" variants={item}>
                <Link href={item.link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${item.color} p-6 rounded-lg shadow-lg cursor-pointer`}
                  >
                    <div className="flex items-center mb-4">
                      {item.icon}
                      <h2 className="text-2xl font-bold ml-4">{item.title}</h2>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              {/* This would be populated with actual recent activity data */}
              <div className="flex items-center mb-2">
                <IconClock className="w-5 h-5 mr-2" />
                <p>Completed "Web Security Challenge" - 2 hours ago</p>
              </div>
              <div className="flex items-center mb-2">
                <IconClock className="w-5 h-5 mr-2" />
                <p>Joined group "Ethical Hackers United" - 1 day ago</p>
              </div>
              <div className="flex items-center">
                <IconClock className="w-5 h-5 mr-2" />
                <p>Started new training session - 3 days ago</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;