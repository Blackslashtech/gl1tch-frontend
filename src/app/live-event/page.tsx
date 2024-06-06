"use client";
import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Header from "../components/Header";
import 'tailwindcss/tailwind.css';

Chart.register(...registerables);

const dummyEvent = {
    title: "Cybersecurity Training Event",
    description: "A comprehensive training session on cybersecurity practices.",
    date: "2024-06-15",
    host: "Cyber Team Alpha",
    stats: {
        totalTeams: 30,
        totalChallenges: 10,
        completedChallenges: 5,
        ongoingChallenges: 5,
    },
    teams: [
        { name: "Team Alpha", score: 150 },
        { name: "Team Beta", score: 120 },
        { name: "Team Gamma", score: 100 },
    ],
    challenges: [
        { name: "Web Security", status: "Completed" },
        { name: "Crypto Analysis", status: "Ongoing" },
        { name: "Network Forensics", status: "Ongoing" },
        { name: "Malware Analysis", status: "Pending" },
    ],
    flags: [
        { team: "Team Alpha", flag: "Flag1", points: 50 },
        { team: "Team Beta", flag: "Flag2", points: 40 },
        { team: "Team Gamma", flag: "Flag3", points: 30 },
    ],
};

const scoreData = {
    labels: ["0", "10", "20", "30", "40", "50"],
    datasets: [
        {
            label: "Team Alpha",
            data: [0, 20, 40, 60, 80, 150],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
        },
        {
            label: "Team Beta",
            data: [0, 10, 30, 50, 70, 120],
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
        },
        {
            label: "Team Gamma",
            data: [0, 5, 20, 35, 50, 100],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
        },
    ],
};

const LiveCyberEvent = () => {
    const [event, setEvent] = useState(dummyEvent);

    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <h1 className="text-3xl font-bold mb-4 dark:text-foreground">{event.title}</h1>
            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Event Overview</h2>
                <p className="mt-2 dark:text-foreground">{event.description}</p>
                <p className="mt-2 dark:text-foreground">Date: {event.date}</p>
                <p className="mt-2 dark:text-foreground">Hosted by: <span className="font-bold">{event.host}</span></p>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Score Graph</h2>
                <Line data={scoreData} />
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Event Stats</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p className="font-bold dark:text-foreground">Total Teams</p>
                        <p className="text-xl dark:text-foreground">{event.stats.totalTeams}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p className="font-bold dark:text-foreground">Total Challenges</p>
                        <p className="text-xl dark:text-foreground">{event.stats.totalChallenges}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p className="font-bold dark:text-foreground">Completed Challenges</p>
                        <p className="text-xl dark:text-foreground">{event.stats.completedChallenges}</p>
                    </div>
                    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p className="font-bold dark:text-foreground">Ongoing Challenges</p>
                        <p className="text-xl dark:text-foreground">{event.stats.ongoingChallenges}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Teams</h2>
                <div className="mt-4">
                    {event.teams.map((team, index) => (
                        <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                            <p className="font-bold dark:text-foreground">{team.name}</p>
                            <p className="text-xl dark:text-foreground">Score: {team.score}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Challenges</h2>
                <div className="mt-4">
                    {event.challenges.map((challenge, index) => (
                        <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                            <p className="font-bold dark:text-foreground">{challenge.name}</p>
                            <p className="text-xl dark:text-foreground">Status: {challenge.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Flags</h2>
                <div className="mt-4">
                    {event.flags.map((flag, index) => (
                        <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                            <p className="font-bold dark:text-foreground">{flag.team}</p>
                            <p className="text-xl dark:text-foreground">Flag: {flag.flag}, Points: {flag.points}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold dark:text-foreground">Scoreboard</h2>
                <div className="mt-4">
                    {event.teams
                        .sort((a, b) => b.score - a.score)
                        .map((team, index) => (
                            <div key={index} className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                                <p className="font-bold dark:text-foreground">{team.name}</p>
                                <p className="text-xl dark:text-foreground">Score: {team.score}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default LiveCyberEvent;
