"use client";
import React from "react";
import Header from "../components/Header";

const playerStats = {
  totalGamesPlayed: 150,
  gamesWon: 80,
  flagsLost: 20,
  flagsGained: 100,
  slaUptime: "99.5%",
  patchesApplied: 50,
  avgTimeToPatch: "15 minutes",
  avgTimeToExploit: "5 minutes",
  totalBloodedServices: 30,
  languagesExposedTo: ["Python", "JavaScript", "C++", "Go"],
};

const PlayerStats = () => {
  return (
    <div className="container mx-auto p-4 dark:bg-background">
      <Header />
      <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Player Stats</h1>
      <div className="bg-card p-6 rounded-lg shadow-md dark:bg-card">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Overall Statistics</h2>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Total Games Played</h3>
            <p className="text-foreground">{playerStats.totalGamesPlayed}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Games Won</h3>
            <p className="text-foreground">{playerStats.gamesWon}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Flags Lost</h3>
            <p className="text-foreground">{playerStats.flagsLost}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Flags Gained</h3>
            <p className="text-foreground">{playerStats.flagsGained}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">SLA Uptime Percentage</h3>
            <p className="text-foreground">{playerStats.slaUptime}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Patches Applied</h3>
            <p className="text-foreground">{playerStats.patchesApplied}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Average Time to Patch</h3>
            <p className="text-foreground">{playerStats.avgTimeToPatch}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Average Time to Exploit</h3>
            <p className="text-foreground">{playerStats.avgTimeToExploit}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-foreground">Total Blooded Services</h3>
            <p className="text-foreground">{playerStats.totalBloodedServices}</p>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-foreground">Languages Exposed To</h3>
            <p className="text-foreground">{playerStats.languagesExposedTo.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
