"use client";
import { useEffect, useState } from "react";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import Header from "../components/header";
import { SparklesCore } from "@/components/ui/sparkles";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";

export const dashboardItems = [
  {
    title: "Upcoming Events",
    description: "View and manage your upcoming events.",
    link: "/events",
  },
  {
    title: "Start Training",
    description: "Begin a new training session.",
    link: "/start-training",
  },
  {
    title: "Custom Training",
    description: "Create and manage custom training sessions.",
    link: "/custom-training",
  },
  {
    title: "Manage Groups",
    description: "Create and manage groups.",
    link: "/manage-groups",
  },
  {
    title: "Manage Profile",
    description: "Update your profile information.",
    link: "/profile",
  },
  {
    title: "Player Stats",
    description: "View your game statistics.",
    link: "/stats",
  },
];

const Dashboard = () => {
  const router = useRouter
  ();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
          console.log("This is the logged in user", user);
        } else {
          console.log("no user found");
          router.push("/");
        }
      });
    };

    checkAuth();
  }, []);

  if (isUserValid) {
    return (
      <div className="relative container mx-auto p-4">
        <Header />
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Dashboard
        </h1>
        <HoverEffect items={dashboardItems} />
        <div className="absolute inset-0 h-full -z-10">
          <SparklesCore
            id="dashboard-bg"
            background="transparent"
            minSize={0.1}
            maxSize={0.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#888"
          />
        </div>
      </div>
    );
  }
};

export default Dashboard;
