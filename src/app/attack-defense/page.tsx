"use client";

import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { Server, Box, Users, Clock, Shield, Zap } from "lucide-react";

interface SectionProps {
    title: string;
    Icon: React.ElementType;
    content: React.ReactNode;
    color: string;
}

const ADInfoPage: React.FC = () => {
    const sections: SectionProps[] = [
        {
            title: "Overview",
            Icon: Box,
            content: (
                <>
                    <p className="mb-4">Attack/Defense is a standardized format of cyber competition involving real-time offense and defense:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Teams receive identical custom services</li>
                        <li>Secure your services while exploiting others'</li>
                        <li>Maintain service uptime</li>
                        <li>Balance between attack and defense strategies</li>
                    </ul>
                </>
            ),
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Services",
            Icon: Server,
            content: (
                <>
                    <p className="mb-4">Each team is provided with custom-built services:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Dockerized environments</li>
                        <li>Various programming languages and frameworks</li>
                        <li>Contain intentional vulnerabilities (e.g., SQL injection)</li>
                        <li>Exploit vulnerabilities to extract flags</li>
                    </ul>
                </>
            ),
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "Gameserver",
            Icon: Users,
            content: (
                <>
                    <p className="mb-4">The central system managing the competition:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>SLA checker runs every tick (usually 30-120 seconds)</li>
                        <li>Places flags, retrieves previous flags, validates service operation</li>
                        <li>Publishes list of flag IDs for live flags</li>
                        <li>Flag IDs are unique identifiers (e.g., username, post ID)</li>
                    </ul>
                </>
            ),
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "Scoring",
            Icon: Clock,
            content: (
                <>
                    <p className="mb-4">Points are awarded based on attack and defense success:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Gain points by stealing and submitting flags</li>
                        <li>Lose points when your flags are stolen</li>
                        <li>Earn points for passing service availability checks</li>
                        <li>Balance offensive and defensive actions for maximum score</li>
                    </ul>
                </>
            ),
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Strategy",
            Icon: Shield,
            content: (
                <>
                    <p className="mb-4">Effective strategies for success:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Automation is key in this fast-paced environment</li>
                        <li>Use "throwers" to automate flag stealing and submission</li>
                        <li>Query scoreboard API for new flag IDs</li>
                        <li>Execute exploits against all other teams</li>
                        <li>Collect and analyze network traffic on your services</li>
                        <li>Identify and counter exploits used by other teams</li>
                    </ul>
                </>
            ),
            color: "from-red-500 to-rose-500",
        },
        {
            title: "Skills Developed",
            Icon: Zap,
            content: (
                <>
                    <p className="mb-4">Attack/Defense competitions enhance various cybersecurity skills:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Source code analysis</li>
                        <li>Incident response</li>
                        <li>Exploit development</li>
                        <li>Automation and scripting</li>
                        <li>Network security controls</li>
                        <li>Teamwork and rapid communication</li>
                        <li>Balancing offensive and defensive actions</li>
                    </ul>
                </>
            ),
            color: "from-indigo-500 to-violet-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-12 sm:py-20">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 sm:mb-20 pt-16 sm:pt-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                >
                    Attack/Defense CTF Guide
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                            style={{ boxShadow: `0 4px 20px rgba(${section.color.split('-')[2].slice(0, -3)}, 0.3)` }}
                        >
                            <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <section.Icon className="w-8 h-8 mr-4 text-gray-300" />
                                    <h2 className="text-2xl font-bold">{section.title}</h2>
                                </div>
                                <div className="text-gray-300">
                                    {section.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <footer className="container mx-auto py-8 text-center text-gray-400">
                <p>&copy; 2024 BLACKSLASH TECHNOLOGY INC. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ADInfoPage;