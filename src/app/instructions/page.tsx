"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Cog, Network, Flag, Trophy, Server, BookOpen, MessageSquare } from "lucide-react";
import Image from 'next/image';

const iconMap = {
    Cog,
    Network,
    Flag,
    Trophy,
    Server,
    BookOpen,
    MessageSquare
};

interface Section {
    title: string;
    icon: keyof typeof iconMap;
    content: React.ReactNode;
    color: string;
}

const InstructionsPage: React.FC = () => {
    const sections: Section[] = [
        {
            title: "Setup",
            icon: "Cog",
            content: (
                <>
                    <h3 className="font-semibold mb-2">Before the Range Opens:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Glitch Bot adds you to Discord channels:
                            <ul className="list-circle list-inside ml-4">
                                <li>General event chat with all teams</li>
                                <li>Scoreboard and announcements channel</li>
                                <li>Private team text and voice chat</li>
                            </ul>
                        </li>
                        <li>Service-specific threads created in team text chat</li>
                    </ul>
                    <h3 className="font-semibold mb-2">When the Range Opens:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>GlitchBot sends a zip file containing:
                            <ul className="list-circle list-inside ml-4">
                                <li>VPN profiles</li>
                                <li>Scoreboard API token</li>
                                <li>Vulnbox credentials</li>
                            </ul>
                        </li>
                        <li>Download and connect to VPN</li>
                        <li>SSH into vulnboxes using provided credentials</li>
                    </ul>
                    <h3 className="font-semibold mb-2">Vulnbox Details:</h3>
                    <ul className="list-disc list-inside">
                        <li>Running Alpine Linux</li>
                        <li>Services dockerized in "/service" directory</li>
                        <li>One vulnbox per service, multiple flagstores possible</li>
                    </ul>
                </>
            ),
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Network",
            icon: "Network",
            content: (
                <>
                    <ul className="list-disc list-inside mb-4">
                        <li>Game network: 10.100.0.0/15 subnet</li>
                        <li>Authorized targets: All hosts in subnet except 10.101.0.1</li>
                        <li>Vulnbox IP format: 10.100.T.S (T = team ID, S = service ID, both 1-indexed)</li>
                        <li>Router (NAT): 10.101.0.1</li>
                        <li>All traffic routed through 10.101.0.1 with source NAT</li>
                    </ul>
                    <p className="mb-2">Network Map:</p>
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <Image
                            src="/NetworkMap.jpeg"
                            alt="Network Map"
                            width={800}
                            height={600}
                            layout="responsive"
                        />
                    </div>
                </>
            ),
            color: "from-green-500 to-teal-500",
        },
        {
            title: "Flag Format",
            icon: "Flag",
            content: (
                <>
                    <p className="mb-2">Flag regex: <code className="bg-gray-700 p-1 rounded">[A-Z0-9]{31}=</code></p>
                    <p className="mb-2">Example: <code className="bg-gray-700 p-1 rounded">XFWEC8CI1OP1DNBD8CJNUB22VIQ22T2=</code></p>
                    <p>FlagIDs vary per service (usually usernames or user IDs)</p>
                </>
            ),
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "API",
            icon: "Server",
            content: (
                <>
                    <h3 className="font-semibold mb-2">Endpoints:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>GET &lt;game&gt;.glitchrange.com/api/hosts</li>
                        <li>GET &lt;game&gt;.glitchrange.com/api/flagids</li>
                        <li>POST &lt;game&gt;.glitchrange.com/api/steal</li>
                    </ul>
                    <h3 className="font-semibold mb-2">Example Responses:</h3>
                    <h4 className="font-semibold mb-1">GET /hosts:</h4>
                    <pre className="bg-gray-700 p-2 rounded mb-4 overflow-x-auto text-xs">
                        {JSON.stringify([
                            {
                                "service_name": "demo-service-1",
                                "service_id": 1,
                                "team_id": 1,
                                "ip": "10.100.1.1"
                            },
                            {
                                "service_name": "demo-service-1",
                                "service_id": 1,
                                "team_id": 2,
                                "ip": "10.100.2.1"
                            }
                        ], null, 2)}
                    </pre>
                    <h4 className="font-semibold mb-1">GET /flagids:</h4>
                    <pre className="bg-gray-700 p-2 rounded mb-4 overflow-x-auto text-xs">
                        {JSON.stringify([
                            {
                                "service": "demo-service-1",
                                "service_id": 1,
                                "team_id": 1,
                                "tick": 5,
                                "flag_id": "2jitycpb2euu3m8v"
                            },
                            {
                                "service": "demo-service-2",
                                "service_id": 2,
                                "team_id": 1,
                                "tick": 6,
                                "flag_id": "{'user': 'bob82738'}"
                            }
                        ], null, 2)}
                    </pre>
                    <h4 className="font-semibold mb-1">POST /steal example:</h4>
                    <pre className="bg-gray-700 p-2 rounded mb-4 overflow-x-auto text-xs">
                        curl -X POST demo.glitchrange.com/api/steal?token=5cfefcf8549395ac3aa5a6322cbb5b8a&flag=XFWEC8CI1OP1DNBD8CJNUB22VIQ22T2%3D
                    </pre>
                    <h4 className="font-semibold mb-1">POST /steal response messages:</h4>
                    <ul className="list-disc list-inside">
                        <li>"error: unauthorized": Incorrect team token</li>
                        <li>"error: invalid": Incorrect flag</li>
                        <li>"error: duplicate": Flag already submitted</li>
                        <li>"error: self": Flag from own team</li>
                        <li>"error: expired": Flag older than lifetime</li>
                        <li>"success": Flag correct, successfully submitted</li>
                    </ul>
                </>
            ),
            color: "from-red-500 to-rose-500",
        },
        {
            title: "Scoreboard Guide",
            icon: "Trophy",
            content: (
                <>
                    <ul className="list-disc list-inside mb-4">
                        <li>All teams begin with 0 points</li>
                        <li>Each stolen flag is worth 1 point (deducted from victim, added to attacker)</li>
                        <li>Each SLA check (PUT, GET, and CHECK) is worth 1 point (3 possible SLA points per tick)</li>
                    </ul>
                    <p className="mb-2">Scoreboard Layout:</p>
                    <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <Image
                            src="/scoreboard-explanation.png"
                            alt="Scoreboard Layout"
                            width={800}
                            height={600}
                            layout="responsive"
                        />
                    </div>
                </>
            ),
            color: "from-indigo-500 to-blue-500",
        },
        {
            title: "Attack/Defense Guide",
            icon: "MessageSquare",
            content: (
                <>
                    <h3 className="font-semibold mb-2">Overview:</h3>
                    <p className="mb-4">Attack/Defense is a real-time offense and defense cyber competition format. Teams secure their services while exploiting others', maintaining service uptime.</p>

                    <h3 className="font-semibold mb-2">Services:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Identical set of custom-built services per team</li>
                        <li>Usually dockerized environments with various programming languages/frameworks</li>
                        <li>Intentional vulnerabilities (e.g., SQL injection)</li>
                        <li>Exploit vulnerabilities to extract flags</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Gameserver:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>SLA checker per service runs every tick (usually 30-120 seconds)</li>
                        <li>Checks: place flag, retrieve previous flag, validate service operation</li>
                        <li>Publishes list of flag IDs for live flags</li>
                        <li>Flag IDs: unique identifiers (e.g., username, post ID) to access flags</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Scoring:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Points gained by stealing and submitting flags</li>
                        <li>Points deducted from losing team when flag is stolen</li>
                        <li>Points awarded for each passed service availability check</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Strategy:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Automation is key due to fast-paced environment</li>
                        <li>"Throwers": tools to automate flag stealing and submission</li>
                        <li>Analyze network traffic on own services to identify exploits</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Skills Developed:</h3>
                    <ul className="list-disc list-inside">
                        <li>Source code analysis</li>
                        <li>Incident response</li>
                        <li>Exploit development</li>
                        <li>Automation/scripting</li>
                        <li>Network security controls</li>
                        <li>Teamwork and communication</li>
                    </ul>
                </>
            ),
            color: "from-pink-500 to-purple-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <BackgroundBeams />
            <div className="relative z-10">
                <header className="container mx-auto py-8">
                    <h1 className="text-4xl font-bold">Glitch Range</h1>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    >
                        Instructions
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {sections.map((section, index) => {
                            const Icon = iconMap[section.icon];
                            return (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg`}
                                >
                                    <div className={`p-6 bg-gradient-to-r ${section.color}`}>
                                        <div className="flex items-center mb-4">
                                            <Icon className="w-8 h-8 mr-4" />
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                        </div>
                                        <div className="mt-4">
                                            {section.content}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
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