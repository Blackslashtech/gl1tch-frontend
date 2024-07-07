"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { IconChevronLeft, IconChevronRight, IconFlag, IconShieldCheck, IconClock, IconServer } from '@tabler/icons-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = {
    max_tick: 20,
    services: [
        { id: 1, name: "Web Service", victims: 3, attackers: 2, firstblood: "Team Alpha" },
        { id: 2, name: "Database", victims: 1, attackers: 4, firstblood: "Team Beta" },
        { id: 3, name: "API Gateway", victims: 2, attackers: 1, firstblood: "Team Gamma" },
    ],
    teams: [
        {
            data: {
                team_id: 1, team_name: "Team Alpha", score: 4350, score_delta: 150,
                offense: 2000, offense_delta: 100, defense: 650, defense_delta: 50, sla: 3000, sla_delta: 100,
                scores: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4350]
            },
            hosts: [
                {
                    offense: 1000, offense_delta: 50, defense: 300, defense_delta: 25, sla: 1500, sla_delta: 50,
                    flags_gained: 10, flags_gained_delta: 2, flags_lost: 3, flags_lost_delta: 1,
                    failed_checks_1: 0, failed_checks_2: 1, failed_checks_3: 0, status_name: "OK", comments: "Running smoothly"
                }
            ]
        },
        {
            data: {
                team_id: 2, team_name: "Team Beta", score: 3980, score_delta: 130,
                offense: 1800, offense_delta: 90, defense: 700, defense_delta: 60, sla: 2880, sla_delta: 100,
                scores: [0, 400, 900, 1400, 1900, 2400, 2900, 3400, 3850, 3980]
            },
            hosts: [
                {
                    offense: 900, offense_delta: 45, defense: 350, defense_delta: 30, sla: 1440, sla_delta: 50,
                    flags_gained: 9, flags_gained_delta: 1, flags_lost: 4, flags_lost_delta: 2,
                    failed_checks_1: 1, failed_checks_2: 0, failed_checks_3: 0, status_name: "Warning", comments: "Minor issues detected"
                }
            ]
        },
        {
            data: {
                team_id: 3, team_name: "Team Gamma", score: 3720, score_delta: 110,
                offense: 1700, offense_delta: 80, defense: 800, defense_delta: 70, sla: 2820, sla_delta: 100,
                scores: [0, 350, 800, 1300, 1800, 2300, 2800, 3300, 3650, 3720]
            },
            hosts: [
                {
                    offense: 850, offense_delta: 40, defense: 400, defense_delta: 35, sla: 1410, sla_delta: 50,
                    flags_gained: 8, flags_gained_delta: 1, flags_lost: 5, flags_lost_delta: 2,
                    failed_checks_1: 2, failed_checks_2: 1, failed_checks_3: 1, status_name: "Critical", comments: "Multiple failures detected"
                }
            ]
        },
    ]
};

const Scoreboard = () => {
    const [currentTick, setCurrentTick] = useState(mockData.max_tick);

    const chartData = {
        labels: Array.from({ length: mockData.max_tick + 1 }, (_, i) => `Tick ${i}`),
        datasets: mockData.teams.map((team, index) => ({
            label: team.data.team_name,
            data: team.data.scores,
            borderColor: `hsl(${index * 360 / mockData.teams.length}, 70%, 50%)`,
            backgroundColor: `hsla(${index * 360 / mockData.teams.length}, 70%, 50%, 0.5)`,
            tension: 0.4,
        })),
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Team Scores Over Time',
                color: 'white',
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
            },
        },
    };

    return (
        
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <Header />
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                GL1TCH RANGE Scoreboard
            </h1>

            <motion.div
                className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Line data={chartData} options={chartOptions} />
            </motion.div>

            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setCurrentTick(Math.max(0, currentTick - 1))}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center"
                    disabled={currentTick === 0}
                >
                    <IconChevronLeft className="mr-2" /> Previous Tick
                </button>
                <h2 className="text-2xl font-semibold bg-gray-800 px-6 py-2 rounded-full">Tick {currentTick}</h2>
                <button
                    onClick={() => setCurrentTick(Math.min(mockData.max_tick, currentTick + 1))}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center"
                    disabled={currentTick === mockData.max_tick}
                >
                    Next Tick <IconChevronRight className="ml-2" />
                </button>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {mockData.services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconServer className="mr-2 text-blue-400" /> {service.name}
                        </h3>
                        <p className="text-gray-400 mb-2">ID: {service.id}</p>
                        <p className="mb-1">Victims: {service.victims}</p>
                        <p className="mb-1">Attackers: {service.attackers}</p>
                        <p className="text-sm text-gray-400">First Blood: {service.firstblood}</p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockData.teams.map((team, index) => (
                    <motion.div
                        key={team.data.team_id}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: chartData.datasets[index].borderColor }}>
                            {team.data.team_name}
                        </h3>
                        <p className="text-gray-400 mb-2">IP: 10.100.{team.data.team_id}.S</p>
                        <p className="text-3xl font-bold mb-4">{team.data.score} <span className="text-green-400 text-xl">(+{team.data.score_delta})</span></p>
                        <div className="grid grid-cols-3 gap-4 text-center mb-6">
                            <div>
                                <IconFlag className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                <p className="font-semibold">{team.data.offense}</p>
                                <p className="text-green-400">(+{team.data.offense_delta})</p>
                            </div>
                            <div>
                                <IconShieldCheck className="w-6 h-6 mx-auto mb-2 text-red-400" />
                                <p className="font-semibold">-{team.data.defense}</p>
                                <p className="text-red-400">(-{team.data.defense_delta})</p>
                            </div>
                            <div>
                                <IconClock className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                                <p className="font-semibold">{team.data.sla}</p>
                                <p className="text-green-400">(+{team.data.sla_delta})</p>
                            </div>
                        </div>
                        {team.hosts.map((host, hostIndex) => (
                            <div key={hostIndex} className="bg-gray-700 rounded-lg p-4 mb-4">
                                <h4 className="text-lg font-semibold mb-2">Host Status</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p>Offense: {host.offense} (+{host.offense_delta})</p>
                                        <p>Defense: -{host.defense} (-{host.defense_delta})</p>
                                        <p>SLA: {host.sla} (+{host.sla_delta})</p>
                                    </div>
                                    <div>
                                        <p>Flags Gained: {host.flags_gained} (+{host.flags_gained_delta})</p>
                                        <p>Flags Lost: {host.flags_lost} (-{host.flags_lost_delta})</p>
                                        <p className={`font-bold ${host.status_name === 'OK' ? 'text-green-400' : host.status_name === 'Warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                                            Status: {host.status_name}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-400">{host.comments}</p>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Scoreboard;