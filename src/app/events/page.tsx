"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import {
    IconCalendarEvent,
    IconInfoCircle,
    IconUserPlus,
    IconUserMinus,
} from "@tabler/icons-react";
import { Dialog } from "@headlessui/react";
import { EvervaultCard } from "../../components/ui/evervault-card";
import Header from "../components/Header";

const dummyEvents = [
    {
        id: 1,
        title: "Cybersecurity Training",
        date: "2024-06-15",
        description: "A comprehensive training session on cybersecurity practices.",
        category: "Workshop",
        hostedBy: "Cyber Team Alpha",
        capacity: 50,
        registeredTeams: 30,
    },
    {
        id: 2,
        title: "Hackathon Event",
        date: "2024-07-20",
        description: "A competitive event to showcase your hacking skills.",
        category: "CTF",
        hostedBy: "Hack Masters",
        capacity: 100,
        registeredTeams: 85,
    },
    {
        id: 3,
        title: "Web Security Workshop",
        date: "2024-08-10",
        description: "An in-depth workshop on web security techniques.",
        category: "RvB",
        hostedBy: "Security Pros",
        capacity: 75,
        registeredTeams: 60,
    },
];

const Events = () => {
    const [events, setEvents] = useState(dummyEvents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleRegister = (eventId: number) => {
        console.log("Register button clicked for event:", eventId);
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, registeredTeams: event.registeredTeams + 1 }
                    : event
            )
        );
    };

    const handleDropout = (eventId: number) => {
        console.log("Drop out button clicked for event:", eventId);
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, registeredTeams: event.registeredTeams - 1 }
                    : event
            )
        );
        setIsDialogOpen(false);
    };

    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold dark:text-foreground">Upcoming Events</h1>
                <button
                    onClick={() => console.log("Navigate back to dashboard")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Dashboard
                </button>
            </div>
            <BentoGrid className="max-w-7xl mx-auto">
                {events.map((event) => (
                    <BentoGridItem
                        key={event.id}
                        title={event.title}
                        description={
                            <>
                                <p>Date: {event.date}</p>
                                <p>Registered Teams: {event.registeredTeams}/{event.capacity}</p>
                                <p>
                                    Hosted by: <span className="font-bold">{event.hostedBy}</span>
                                </p>
                            </>
                        }
                        header={
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleRegister(event.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    <IconUserPlus className="inline-block mr-1" />
                                    Register
                                </button>
                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                >
                                    <IconInfoCircle className="inline-block mr-1" />
                                    Details
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setIsDialogOpen(true);
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    <IconUserMinus className="inline-block mr-1" />
                                    Drop Out
                                </button>
                            </div>
                        }
                        icon={<IconCalendarEvent className="h-8 w-8 text-neutral-500" />}
                        className="relative"
                    >
                        <div className="absolute inset-0 z-0">
                            <EvervaultCard text={event.category} />
                        </div>
                    </BentoGridItem>
                ))}
            </BentoGrid>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="bg-white dark:bg-background rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-foreground">Confirm Drop Out</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-foreground">
                            Are you sure you want to drop out of the event "{selectedEvent?.title}"?
                        </Dialog.Description>

                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={() => handleDropout(selectedEvent?.id)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Events;
