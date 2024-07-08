"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { IconPlayerPlay, IconPlayerStop, IconNetwork } from "@tabler/icons-react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data - replace with actual API calls
const eventData = {
    name: "Cybersecurity Training Event",
    date: "2024-06-15",
    startTime: "09:00",
    endTime: "17:00",
    participants: 30,
    services: [
        { id: 1, name: "Web Service", status: "running", uptime: 99.9 },
        { id: 2, name: "Database Service", status: "stopped", uptime: 95.5 },
        { id: 3, name: "API Gateway", status: "running", uptime: 98.7 },
    ],
    teams: [
        { id: 1, name: "Team Alpha", score: 850, flagsCaptured: 15, flagsLost: 5, slaUptime: 99.5 },
        { id: 2, name: "Team Beta", score: 720, flagsCaptured: 12, flagsLost: 8, slaUptime: 97.8 },
        { id: 3, name: "Team Gamma", score: 680, flagsCaptured: 10, flagsLost: 7, slaUptime: 98.2 },
    ],
};

const EventManagement = () => {
    const [event, setEvent] = useState(eventData);
    const [networkInfo, setNetworkInfo] = useState(null);

    useEffect(() => {
        // Fetch network information
        // This would be an API call in a real application
        setNetworkInfo({
            rangeNetwork: "10.100.0.0/15",
            infrastructureSubnet: "10.101.0.0/16",
            teamSubnet: "10.100.<team_id>.0/24",
            internalNetwork: "10.102.0.0/16",
            checkerNetwork: "10.103.0.0/16",
        });
    }, []);

    const handleServiceToggle = (serviceId) => {
        setEvent(prev => ({
            ...prev,
            services: prev.services.map(service =>
                service.id === serviceId
                    ? { ...service, status: service.status === 'running' ? 'stopped' : 'running' }
                    : service
            )
        }));
    };

    const chartData = {
        labels: event.teams.map(team => team.name),
        datasets: [
            {
                label: 'Score',
                data: event.teams.map(team => team.score),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
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
                    Glitch Range: {event.name}
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                        <p><strong>Participants:</strong> {event.participants}</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Services</h2>
                        {event.services.map(service => (
                            <div key={service.id} className="flex justify-between items-center mb-2">
                                <span>{service.name}</span>
                                <div>
                                    <span className={`mr-2 ${service.status === 'running' ? 'text-green-400' : 'text-red-400'}`}>
                                        {service.status}
                                    </span>
                                    <button
                                        onClick={() => handleServiceToggle(service.id)}
                                        className={`p-2 rounded-full ${service.status === 'running' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                    >
                                        {service.status === 'running' ? <IconPlayerStop size={16} /> : <IconPlayerPlay size={16} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">Network Information</h2>
                    {networkInfo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(networkInfo).map(([key, value]) => (
                                <div key={key} className="flex items-center">
                                    <IconNetwork className="mr-2 text-blue-400" />
                                    <span><strong>{key}:</strong> {value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">Team Performances</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="p-2 text-left">Team</th>
                                    <th className="p-2 text-left">Score</th>
                                    <th className="p-2 text-left">Flags Captured</th>
                                    <th className="p-2 text-left">Flags Lost</th>
                                    <th className="p-2 text-left">SLA Uptime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.teams.map(team => (
                                    <tr key={team.id} className="border-b border-gray-700">
                                        <td className="p-2">{team.name}</td>
                                        <td className="p-2">{team.score}</td>
                                        <td className="p-2">{team.flagsCaptured}</td>
                                        <td className="p-2">{team.flagsLost}</td>
                                        <td className="p-2">{team.slaUptime}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">Score Overview</h2>
                    <Line data={chartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Team Scores'
                            }
                        }
                    }} />
                </motion.div>
            </div>
        </div>
    );
};

export default EventManagement;