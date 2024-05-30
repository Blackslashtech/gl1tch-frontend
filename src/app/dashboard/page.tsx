"use client";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import Header from "../components/Header"; 

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
  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <HoverEffect items={dashboardItems} />
    </div>
  );
};

export default Dashboard;