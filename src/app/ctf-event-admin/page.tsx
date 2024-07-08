"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { IconFlag, IconServer, IconUsers, IconClock, IconTrophy, IconBug } from "@tabler/icons-react";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Mock data for CTF event
const ctfEventData = {
    name: "Cyber Guardian CTF 2024",
    date: "2024-07-20",
    startTime: "09:00",
    endTime: "21:00",
    participants: 50,
    challenges: [
        { id: 1, name: "Web Exploitation", difficulty: "Medium", solved: 15, points: 300 },
        { id: 2, name: "Reverse Engineering", difficulty: "Hard", solved: 8, points: 500 },
        { id: 3, name: "Cryptography", difficulty: "Easy", solved: 25, points: 200 },
        { id: 4, name: "Forensics", difficulty: "Medium", solved: 12, points: 350 },
        { id: 5, name: "Binary Exploitation", difficulty: "Hard", solved: 5, points: 600 },
    ],
    teams: [
        { id: 1, name: "Binary Bandits", score: 1500, solvedChallenges: 4, lastSubmission: "2024-07-20T14:30:00" },
        { id: 2, name: "Hack Horizon", score: 1350, solvedChallenges: 3, lastSubmission: "2024-07-20T15:15:00" },
        { id: 3, name: "Cyber Sentinels", score: 1200, solvedChallenges: 3, lastSubmission: "2024-07-20T13:45:00" },
        { id: 4, name: "Data Defenders", score: 1050, solvedChallenges: 2, lastSubmission: "2024-07-20T16:00:00" },
    ],
};

const CTFEventAdmin = () => {
    const [event, setEvent] = useState(ctfEventData);
    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(`${event.date}T${event.endTime}`);
            const diff = end - now;
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeRemaining("Event Ended");
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    const scoreData = {
        labels: event.teams.map(team => team.name),
        datasets: [{
            label: 'Score',
            data: event.teams.map(team => team.score),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const challengeData = {
        labels: event.challenges.map(challenge => challenge.name),
        datasets: [{
            label: 'Solves',
            data: event.challenges.map(challenge => challenge.solved),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Header />
            <div className="container mx-auto p-8 pt-24">
                <motion.h1
                    className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    CTF Admin: {event.name}
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <IconClock className="mr-2" /> Event Timer
                        </h2>
                        <p className="text-3xl font-bold text-green-400">{timeRemaining}</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <IconUsers className="mr-2" /> Participants
                        </h2>
                        <p className="text-3xl font-bold">{event.participants}</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <IconFlag className="mr-2" /> Total Challenges
                        </h2>
                        <p className="text-3xl font-bold">{event.challenges.length}</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <IconTrophy className="mr-2" /> Leaderboard
                        </h2>
                        <Bar data={scoreData} options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                title: { display: true, text: 'Team Scores' }
                            }
                        }} />
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <IconBug className="mr-2" /> Challenge Statistics
                        </h2>
                        <Bar data={challengeData} options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                title: { display: true, text: 'Challenge Solves' }
                            }
                        }} />
                    </motion.div>
                </div>

                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <IconServer className="mr-2" /> Challenge Management
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Difficulty</th>
                                    <th className="p-2 text-left">Solves</th>
                                    <th className="p-2 text-left">Points</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.challenges.map(challenge => (
                                    <tr key={challenge.id} className="border-b border-gray-700">
                                        <td className="p-2">{challenge.name}</td>
                                        <td className="p-2">{challenge.difficulty}</td>
                                        <td className="p-2">{challenge.solved}</td>
                                        <td className="p-2">{challenge.points}</td>
                                        <td className="p-2">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                                            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CTFEventAdmin;