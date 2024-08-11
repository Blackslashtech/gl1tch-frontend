"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Box, Users, Clock, Shield, Zap } from "lucide-react";

interface SectionProps {
    title: string;
    Icon: React.ElementType;
    content: React.ReactNode;
    color: string;
}

const ADInfoPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const sections: SectionProps[] = [
        {
            title: "Gameserver",
            Icon: Server,
            content: (
                <>
                    <p className="mb-4">The backbone of the competition, managed by organizers:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Runs throughout the event</li>
                        <li>Periodically plants and retrieves flags</li>
                        <li>Uses legitimate service functionality</li>
                        <li>Doesn't exploit vulnerabilities</li>
                        <li>Tracks Service Level Agreement (SLA)</li>
                    </ul>
                </>
            ),
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Your Vulnbox",
            Icon: Box,
            content: (
                <>
                    <p className="mb-4">Your team's virtual machine:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Hosts all competition services</li>
                        <li>Stores flags planted by Gameserver</li>
                        <li>Accessible to all teams</li>
                        <li>Primary target for attacks</li>
                        <li>Defending it earns you points</li>
                    </ul>
                    <p className="mt-4">Tip: Start analyzing as soon as you get access!</p>
                </>
            ),
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "Other Teams",
            Icon: Users,
            content: (
                <>
                    <p className="mb-4">Your competitors in the CTF:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Connected to the same VPN</li>
                        <li>Have known Vulnbox IP addresses</li>
                        <li>Will attempt to exploit your services</li>
                        <li>Are your targets for attack points</li>
                    </ul>
                    <p className="mt-4">Remember: Only target competition Vulnboxes!</p>
                </>
            ),
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "Time Management",
            Icon: Clock,
            content: (
                <>
                    <p className="mb-4">Efficient use of time is crucial:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>1 hour prep time before network opens</li>
                        <li>Decrypt and analyze services quickly</li>
                        <li>Be ready to defend from the start</li>
                        <li>Automate exploits for continuous attacks</li>
                    </ul>
                </>
            ),
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Defense Strategies",
            Icon: Shield,
            content: (
                <>
                    <p className="mb-4">Protecting your Vulnbox is key:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Patch vulnerabilities without breaking functionality</li>
                        <li>Monitor your services for unusual activity</li>
                        <li>Maintain SLA to keep earning points</li>
                        <li>Balance between security and service availability</li>
                    </ul>
                </>
            ),
            color: "from-red-500 to-rose-500",
        },
        {
            title: "Attack Techniques",
            Icon: Zap,
            content: (
                <>
                    <p className="mb-4">Effective attacking for maximum points:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Analyze services for vulnerabilities</li>
                        <li>Develop exploits for flag extraction</li>
                        <li>Script your attacks for periodic execution</li>
                        <li>Submit flags promptly for points</li>
                        <li>Adapt your strategy as services get patched</li>
                    </ul>
                </>
            ),
            color: "from-indigo-500 to-violet-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-20">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl font-bold pt-16 mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                >
                    Attack/Defense CTF Guide
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${activeSection === section.title ? 'ring-4 ring-opacity-50' : ''
                                }`}
                            style={{ boxShadow: `0 0 20px rgba(${section.color.split('-')[2].slice(0, -3)}, 0.3)` }}
                            onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                        >
                            <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                            <div className="p-6">
                                <section.Icon className="w-12 h-12 mb-4 text-gray-300" />
                                <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                                <AnimatePresence>
                                    {activeSection === section.title && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 text-gray-300"
                                        >
                                            {section.content}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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