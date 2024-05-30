"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import {
    IconPlus,
    IconUsers,
    IconUserCheck,
    IconUserX,
} from "@tabler/icons-react";
import { Dialog } from "@headlessui/react";
import Header from "../components/Header"; // Ensure the correct path to Header

const dummyGroups = [
    {
        id: 1,
        name: "Cyber Team Alpha",
        members: 10,
        description: "A team of elite cybersecurity professionals.",
    },
    {
        id: 2,
        name: "Hack Masters",
        members: 15,
        description: "A group of skilled hackers.",
    },
    {
        id: 3,
        name: "Security Pros",
        members: 8,
        description: "Professional security experts.",
    },
];

const ManageGroups = () => {
    const [groups, setGroups] = useState(dummyGroups);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [joinCode, setJoinCode] = useState("");

    const handleCreateGroup = () => {
        console.log("Create group button clicked");
        const newGroup = {
            id: groups.length + 1,
            name: groupName,
            members: 1,
            description: groupDescription,
        };
        setGroups([...groups, newGroup]);
        setGroupName("");
        setGroupDescription("");
        setIsCreateDialogOpen(false);
    };

    const handleJoinGroup = () => {
        console.log("Join group button clicked with code:", joinCode);
        // Add logic to join group using the join code
        setJoinCode("");
        setIsJoinDialogOpen(false);
    };

    const handleLeaveGroup = (groupId: number) => {
        console.log("Leave group button clicked for group:", groupId);
        setGroups(groups.filter((group) => group.id !== groupId));
    };

    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold dark:text-foreground">Manage Groups</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Create Group
                    </button>
                    <button
                        onClick={() => setIsJoinDialogOpen(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        Join Group
                    </button>
                </div>
            </div>
            <BentoGrid className="max-w-7xl mx-auto">
                {groups.map((group) => (
                    <BentoGridItem
                        key={group.id}
                        title={group.name}
                        description={
                            <>
                                <p>Members: {group.members}</p>
                                <p>{group.description}</p>
                            </>
                        }
                        header={
                            <button
                                onClick={() => handleLeaveGroup(group.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                <IconUserX className="inline-block mr-1" />
                                Leave Group
                            </button>
                        }
                        icon={<IconUsers className="h-8 w-8 text-neutral-500" />}
                    />
                ))}
            </BentoGrid>

            <Dialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="bg-white dark:bg-background rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-foreground">Create Group</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-foreground">
                            Enter the details for the new group.
                        </Dialog.Description>

                        <div className="mt-4">
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Group Name"
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <textarea
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}
                                placeholder="Group Description"
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                                rows={3}
                            />
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md w-full"
                                onClick={handleCreateGroup}
                            >
                                <IconPlus className="inline-block mr-1" />
                                Create Group
                            </button>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                onClick={() => setIsCreateDialogOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog open={isJoinDialogOpen} onClose={() => setIsJoinDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="bg-white dark:bg-background rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-foreground">Join Group</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-foreground">
                            Enter the join code for the group you want to join.
                        </Dialog.Description>

                        <div className="mt-4">
                            <input
                                type="text"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                placeholder="Join Code"
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            />
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
                                onClick={handleJoinGroup}
                            >
                                <IconUserCheck className="inline-block mr-1" />
                                Join Group
                            </button>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                onClick={() => setIsJoinDialogOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ManageGroups;
