"use client";
import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { IconTrophy, IconFlag, IconServer, IconClock, IconCode } from "@tabler/icons-react";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const playerStats = {
  totalGamesPlayed: 150,
  gamesWon: 80,
  flagsLost: 20,
  flagsGained: 100,
  slaUptime: 99.5,
  patchesApplied: 50,
  avgTimeToPatch: 15,
  avgTimeToExploit: 5,
  totalBloodedServices: 30,
  languagesExposedTo: ["Python", "JavaScript", "C++", "Go", "Ruby", "Java"],
};

const PlayerStats = () => {
  const winRateData = {
    labels: ['Won', 'Lost'],
    datasets: [
      {
        data: [playerStats.gamesWon, playerStats.totalGamesPlayed - playerStats.gamesWon],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#45a049', '#e53935'],
      },
    ],
  };

  const flagsData = {
    labels: ['Flags Gained', 'Flags Lost'],
    datasets: [
      {
        label: 'Flags',
        data: [playerStats.flagsGained, playerStats.flagsLost],
        backgroundColor: ['#2196F3', '#FF9800'],
      },
    ],
  };

  const StatCard = ({ icon, title, value, color }) => (
    <motion.div 
      className={`bg-gray-800 p-6 rounded-lg shadow-lg ${color}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-2 text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Player Statistics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<IconTrophy className="w-8 h-8 text-yellow-500" />}
            title="Games Won"
            value={playerStats.gamesWon}
            color="bg-yellow-900"
          />
          <StatCard 
            icon={<IconFlag className="w-8 h-8 text-blue-500" />}
            title="Flags Gained"
            value={playerStats.flagsGained}
            color="bg-blue-900"
          />
          <StatCard 
            icon={<IconServer className="w-8 h-8 text-green-500" />}
            title="SLA Uptime"
            value={`${playerStats.slaUptime}%`}
            color="bg-green-900"
          />
          <StatCard 
            icon={<IconCode className="w-8 h-8 text-purple-500" />}
            title="Blooded Services"
            value={playerStats.totalBloodedServices}
            color="bg-purple-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div 
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Win Rate</h2>
            <Doughnut data={winRateData} options={{ responsive: true }} />
          </motion.div>
          <motion.div 
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Flags Statistics</h2>
            <Bar 
              data={flagsData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Time Statistics</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <IconClock className="w-12 h-12 mx-auto text-blue-500" />
              <p className="mt-2 text-lg">Avg. Time to Patch</p>
              <p className="text-2xl font-bold">{playerStats.avgTimeToPatch} min</p>
            </div>
            <div className="text-center">
              <IconClock className="w-12 h-12 mx-auto text-red-500" />
              <p className="mt-2 text-lg">Avg. Time to Exploit</p>
              <p className="text-2xl font-bold">{playerStats.avgTimeToExploit} min</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Languages Exposed To</h2>
          <div className="flex flex-wrap gap-2">
            {playerStats.languagesExposedTo.map((lang, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerStats;