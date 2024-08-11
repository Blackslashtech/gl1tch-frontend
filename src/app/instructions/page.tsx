"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { analytics } from "@/utils/firebase";
import { logEvent } from "firebase/analytics";
import { Cog, Network, Flag, Trophy, Server, BookOpen, ChevronDown } from "lucide-react";
import Image from 'next/image';

interface InstructionSectionProps {
    title: string;
    icon: React.ElementType;
    content: React.ReactNode;
    color: string;
}

const InstructionsPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        logAnalyticsEvent('page_view', {
            page_title: 'Instructions',
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }, []);

    const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
        if (analytics) {
            logEvent(analytics, eventName, eventParams);
        }
    };

    const sections: InstructionSectionProps[] = [
        {
            title: "Setup",
            icon: Cog,
            content: (
                <>
                    <p>Unique team tokens will be provided prior to range open. Example token:</p>
                    <code className="bg-gray-700 p-2 rounded block my-2 text-sm">5cfefcf8549395ac3aa5a6322cbb5b8a</code>
                </>
            ),
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Network",
            icon: Network,
            content: (
                <ul className="list-disc list-inside space-y-1">
                    <li>Services: 10.100.0.0/15 network</li>
                    <li>Team subnet: 10.100.T.0/24 (T = team ID)</li>
                    <li>Vulnbox IP: 10.100.T.S (S = service ID)</li>
                    <li>VPN server (NAT): 10.101.0.1</li>
                    <li>Vulnboxes: Alpine Linux with Docker</li>
                </ul>
            ),
            color: "from-green-500 to-teal-500",
        },
        {
            title: "Flag Format",
            icon: Flag,
            content: (
                <>
                    <p>Flag regex: <code className="bg-gray-700 p-1 rounded">[A-Z0-9]{31}=</code></p>
                    <p>Example: <code className="bg-gray-700 p-1 rounded">XFWEC8CI1OP1DNBD8CJNUB22VIQ22T2=</code></p>
                    <p>FlagIDs vary per service (usually usernames or user IDs)</p>
                </>
            ),
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "API Endpoints",
            icon: Server,
            content: (
                <ul className="list-disc list-inside space-y-1">
                    <li>External: <code className="bg-gray-700 p-1 rounded">http://[SERVER_URL]:[API_PORT]</code></li>
                    <li>Internal: <code className="bg-gray-700 p-1 rounded">http://10.101.0.2:80</code></li>
                    <li><strong>POST /steal</strong>: Submit flags</li>
                    <li><strong>POST /rename</strong>: Change team name</li>
                    <li><strong>GET /hosts</strong>: List targets</li>
                    <li><strong>GET /flagids</strong>: List active Flag IDs</li>
                    <li>Full OpenAPI docs at /docs</li>
                </ul>
            ),
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "API Examples",
            icon: BookOpen,
            content: (
                <div className="space-y-4">
                    <details>
                        <summary className="cursor-pointer font-semibold">GET /hosts response</summary>
                        <pre className="bg-gray-700 p-2 rounded mt-2 overflow-x-auto text-xs">
                            {JSON.stringify([
                                {
                                    "service_name": "simple",
                                    "service_id": 1,
                                    "team_id": 1,
                                    "ip": "10.100.1.1"
                                },
                                {
                                    "service_name": "simple",
                                    "service_id": 1,
                                    "team_id": 2,
                                    "ip": "10.100.2.1"
                                }
                            ], null, 2)}
                        </pre>
                    </details>
                    <details>
                        <summary className="cursor-pointer font-semibold">GET /flagids response</summary>
                        <pre className="bg-gray-700 p-2 rounded mt-2 overflow-x-auto text-xs">
                            {JSON.stringify([
                                {
                                    "service": "simple",
                                    "service_id": 1,
                                    "team_id": 1,
                                    "tick": 66392,
                                    "flag_id": "2jitycpb2euu3m8v"
                                },
                                {
                                    "service": "simple",
                                    "service_id": 1,
                                    "team_id": 2,
                                    "tick": 66392,
                                    "flag_id": "rajafpy4mlajeguz"
                                }
                            ], null, 2)}
                        </pre>
                    </details>
                </div>
            ),
            color: "from-red-500 to-rose-500",
        },
        {
            title: "Scoreboard Guide",
            icon: Trophy,
            content: (
                <div className="space-y-4">
                    <Image
                        src="/scoreboard-explanation.png"
                        alt="Scoreboard Explanation"
                        width={800}
                        height={400}
                        layout="responsive"
                    />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Current tick and navigation</li>
                        <li>Team standings and points</li>
                        <li>Service status indicators</li>
                        <li>Attack and defense metrics</li>
                    </ul>
                </div>
            ),
            color: "from-indigo-500 to-blue-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <BackgroundBeams />
            <div className="relative z-10">
                <Header />

                <main className="container mx-auto px-4 py-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-bold mb-16 pt-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Glitch Range Instructions
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gray-800 rounded-lg overflow-hidden`}
                            >
                                <div
                                    className={`p-6 cursor-pointer bg-gradient-to-r ${section.color} flex items-center justify-between`}
                                    onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                                >
                                    <div className="flex items-center">
                                        <section.icon className="w-8 h-8 mr-4" />
                                        <h2 className="text-2xl font-bold">{section.title}</h2>
                                    </div>
                                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeSection === section.title ? 'transform rotate-180' : ''}`} />
                                </div>
                                <AnimatePresence>
                                    {activeSection === section.title && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="p-6 bg-gray-800"
                                        >
                                            {section.content}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </main>

                <footer className="container mx-auto py-8 text-center text-gray-400">
                    <p>&copy; 2024 BLACKSLASH TECHNOLOGY INC. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default InstructionsPage;