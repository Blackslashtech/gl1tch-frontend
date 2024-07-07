"use client";
import React, { useState } from "react";
import {
    IconCalendarEvent,
    IconInfoCircle,
    IconUserPlus,
    IconUserMinus,
    IconPlus,
} from "@tabler/icons-react";
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
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        description: "",
        category: "",
        hostedBy: "",
        capacity: 0,
    });

    const handleRegister = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, registeredTeams: event.registeredTeams + 1 }
                    : event
            )
        );
    };

    const handleDropout = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId
                    ? { ...event, registeredTeams: event.registeredTeams - 1 }
                    : event
            )
        );
        setIsDialogOpen(false);
    };

    const handleCreateEvent = () => {
        const newId = Math.max(...events.map(e => e.id)) + 1;
        setEvents([...events, { ...newEvent, id: newId, registeredTeams: 0 }]);
        setIsCreateDialogOpen(false);
        setNewEvent({
            title: "",
            date: "",
            description: "",
            category: "",
            hostedBy: "",
            capacity: 0,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Header />
            <div className="container mx-auto p-8 pt-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Upcoming Events
                    </h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setIsCreateDialogOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <IconPlus className="inline-block mr-2" />
                            Create Event
                        </button>
                        <button
                            onClick={() => console.log("Navigate back to dashboard")}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                            <p className="text-gray-300">Date: {event.date}</p>
                            <p className="text-gray-300">Registered Teams: {event.registeredTeams}/{event.capacity}</p>
                            <p className="text-gray-300">
                                Hosted by: <span className="font-bold">{event.hostedBy}</span>
                            </p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleRegister(event.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    <IconUserPlus className="inline-block mr-1" />
                                    Register
                                </button>
                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                                >
                                    <IconInfoCircle className="inline-block mr-1" />
                                    Details
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setIsDialogOpen(true);
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                >
                                    <IconUserMinus className="inline-block mr-1" />
                                    Drop Out
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Drop Out</h2>
                        <p className="mb-4">Are you sure you want to drop out of the event "{selectedEvent?.title}"?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => handleDropout(selectedEvent?.id)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCreateDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Event Title</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Date</label>
                                <input
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Category</label>
                                <input
                                    type="text"
                                    value={newEvent.category}
                                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Hosted By</label>
                                <input
                                    type="text"
                                    value={newEvent.hostedBy}
                                    onChange={(e) => setNewEvent({ ...newEvent, hostedBy: e.target.value })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Capacity</label>
                                <input
                                    type="number"
                                    value={newEvent.capacity}
                                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;