"use client";

import React from "react";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const eventData = {
    teams: [
        { name: "Team Alpha", points: 120, flags: 10 },
        { name: "Team Beta", points: 95, flags: 8 },
        { name: "Team Gamma", points: 75, flags: 6 },
    ],
    boxes: [
        { id: 1, name: "Box 1", status: "Live" },
        { id: 2, name: "Box 2", status: "Down" },
        { id: 3, name: "Box 3", status: "Live" },
    ],
    flags: [
        { id: 1, name: "Flag 1", status: "Captured" },
        { id: 2, name: "Flag 2", status: "Available" },
        { id: 3, name: "Flag 3", status: "Captured" },
    ],
    totalPoints: 300,
};

const chartData = {
    labels: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50"],
    datasets: [
        {
            label: "Team Alpha",
            data: [20, 40, 60, 80, 100, 120],
            borderColor: "#3e95cd",
            fill: false,
        },
        {
            label: "Team Beta",
            data: [15, 30, 45, 60, 75, 95],
            borderColor: "#8e5ea2",
            fill: false,
        },
        {
            label: "Team Gamma",
            data: [10, 20, 30, 50, 60, 75],
            borderColor: "#3cba9f",
            fill: false,
        },
    ],
};

const AnalyticsPage = () => {
    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Analytics and Reporting</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 dark:text-foreground">Score Graph</h2>
                <Line data={chartData} />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 dark:text-foreground">Teams</h2>
                <table className="min-w-full bg-white dark:bg-background">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Team</th>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Points</th>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Flags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventData.teams.map((team) => (
                            <tr key={team.name}>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{team.name}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{team.points}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{team.flags}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 dark:text-foreground">Box Instances</h2>
                <table className="min-w-full bg-white dark:bg-background">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Box</th>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventData.boxes.map((box) => (
                            <tr key={box.id}>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{box.name}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{box.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 dark:text-foreground">Flags</h2>
                <table className="min-w-full bg-white dark:bg-background">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Flag</th>
                            <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventData.flags.map((flag) => (
                            <tr key={flag.id}>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{flag.name}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-700">{flag.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 dark:text-foreground">Total Points Available</h2>
                <p className="text-lg dark:text-foreground">{eventData.totalPoints}</p>
            </div>
        </div>
    );
};

export default AnalyticsPage;
