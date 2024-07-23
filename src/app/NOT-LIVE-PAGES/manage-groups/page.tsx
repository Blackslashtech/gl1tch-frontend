"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconUsers, IconUserCheck, IconUserX, IconCopy, IconCheck } from "@tabler/icons-react";

// Function to generate a unique 16-character string
const generateUniqueCode = () => {
    return Array(16).fill(0).map(() => Math.random().toString(36).charAt(2)).join('').toUpperCase();
};

const dummyGroups = [
    { id: 1, name: "Cyber Team Alpha", members: 10, description: "A team of elite cybersecurity professionals.", joinCode: generateUniqueCode() },
    { id: 2, name: "Hack Masters", members: 15, description: "A group of skilled hackers.", joinCode: generateUniqueCode() },
    { id: 3, name: "Security Pros", members: 8, description: "Professional security experts.", joinCode: generateUniqueCode() },
];

const ManageGroups = () => {
    const [groups, setGroups] = useState(dummyGroups);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [newGroup, setNewGroup] = useState({ name: "", description: "" });
    const [joinCode, setJoinCode] = useState("");
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        if (copiedCode) {
            const timer = setTimeout(() => setCopiedCode(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [copiedCode]);

    const handleCreateGroup = () => {
        if (!newGroup.name || !newGroup.description) {
            alert("Please fill in all fields");
            return;
        }
        const newId = Math.max(...groups.map(g => g.id)) + 1;
        const createdGroup = {
            ...newGroup,
            id: newId,
            members: 1,
            joinCode: generateUniqueCode()
        };
        setGroups([...groups, createdGroup]);
        setNewGroup({ name: "", description: "" });
        setIsCreateDialogOpen(false);
    };

    const handleJoinGroup = () => {
        const group = groups.find(g => g.joinCode === joinCode);
        if (group) {
            setGroups(groups.map(g => g.id === group.id ? { ...g, members: g.members + 1 } : g));
            setJoinCode("");
            setIsJoinDialogOpen(false);
        } else {
            alert("Invalid join code");
        }
    };

    const handleLeaveGroup = (groupId) => {
        setGroups(groups.filter(g => g.id !== groupId));
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
    };

    const Modal = ({ isOpen, onClose, title, children }) => (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">{title}</h2>
                        {children}
                        <button 
                            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto px-4 py-8 pt-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Manage Groups</h1>
                    <div className="space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                            onClick={() => setIsCreateDialogOpen(true)}
                        >
                            <IconPlus className="inline-block mr-2" />
                            Create Group
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
                            onClick={() => setIsJoinDialogOpen(true)}
                        >
                            <IconUserCheck className="inline-block mr-2" />
                            Join Group
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <motion.div
                            key={group.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h2 className="text-2xl font-bold mb-2 dark:text-white">{group.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Members: {group.members}</p>
                            <div className="flex justify-between items-center">
                                <div className="relative">
                                    <button
                                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        onClick={() => copyToClipboard(group.joinCode)}
                                    >
                                        {copiedCode === group.joinCode ? <IconCheck className="inline-block mr-1" /> : <IconCopy className="inline-block mr-1" />}
                                        {group.joinCode}
                                    </button>
                                    {copiedCode === group.joinCode && (
                                        <span className="absolute top-full left-0 mt-2 text-sm text-green-500">Copied!</span>
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                    onClick={() => handleLeaveGroup(group.id)}
                                >
                                    <IconUserX className="inline-block mr-1" />
                                    Leave
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Modal isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} title="Create Group">
                    <input
                        type="text"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Group Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <textarea
                        value={newGroup.description}
                        onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Group Description"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        rows={3}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleCreateGroup}
                    >
                        Create Group
                    </motion.button>
                </Modal>

                <Modal isOpen={isJoinDialogOpen} onClose={() => setIsJoinDialogOpen(false)} title="Join Group">
                    <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        placeholder="Enter Join Code"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                        onClick={handleJoinGroup}
                    >
                        Join Group
                    </motion.button>
                </Modal>
            </div>
        </div>
    );
};

export default ManageGroups;