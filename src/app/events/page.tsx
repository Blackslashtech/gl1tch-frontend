"use client";
import React, { useState } from "react";
import { IconInfoCircle, IconUserPlus, IconUserMinus, IconPlus, IconEdit } from "@tabler/icons-react";
import Header from "../components/Header";
import { dummyEvents } from './dummyEvents';

const Events = () => {
    const [events, setEvents] = useState(dummyEvents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "", category: "", eventType: "Individual", hostedBy: "", capacity: 0, eventCode: "", eventLink: "", paymentInfo: "", prize: "", additionalInfo: "" });

    const handleRegister = (eventId) => setEvents(prevEvents => prevEvents.map(event => event.id === eventId ? { ...event, registeredTeams: event.registeredTeams + 1 } : event));
    const handleDropout = (eventId) => {
        setEvents(prevEvents => prevEvents.map(event => event.id === eventId ? { ...event, registeredTeams: event.registeredTeams - 1 } : event));
        setIsDialogOpen(false);
    };
    const handleCreateEvent = () => {
        const newId = Math.max(...events.map(e => e.id)) + 1;
        setEvents([...events, { ...newEvent, id: newId, registeredTeams: 0, createdBy: "currentUser" }]);
        setIsCreateDialogOpen(false);
        setNewEvent({ title: "", date: "", description: "", category: "", eventType: "Individual", hostedBy: "", capacity: 0, eventCode: "", eventLink: "", paymentInfo: "", prize: "", additionalInfo: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Header />
            <div className="container mx-auto p-8 pt-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Upcoming Events</h1>
                    <div className="space-x-4">
                        <button onClick={() => setIsCreateDialogOpen(true)} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">
                            <IconPlus className="inline-block mr-2" />Create Event
                        </button>
                        <button onClick={() => console.log("Navigate back to dashboard")} className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-lg hover:shadow-xl transition duration-300">Dashboard</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                            <p className="text-gray-300">Date: {event.date}</p>
                            <p className="text-gray-300">Type: {event.category} ({event.eventType})</p>
                            <p className="text-gray-300">Registered: {event.registeredTeams}/{event.capacity}</p>
                            <p className="text-gray-300">Hosted by: <span className="font-bold">{event.hostedBy}</span></p>
                            <div className="mt-4 flex justify-between">
                                <button onClick={() => handleRegister(event.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                                    <IconUserPlus className="inline-block mr-1" />Register
                                </button>
                                <button onClick={() => { setSelectedEvent(event); setIsDetailsDialogOpen(true); }} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">
                                    <IconInfoCircle className="inline-block mr-1" />Details
                                </button>
                                <button onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); }} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                                    <IconUserMinus className="inline-block mr-1" />Drop Out
                                </button>
                            </div>
                            {event.createdBy === "currentUser" && (
                                <div className="mt-2">
                                    <button onClick={() => console.log("Navigate to admin page")} className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">
                                        <IconEdit className="inline-block mr-1" />Admin Page
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dialogs */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Drop Out</h2>
                        <p className="mb-4">Are you sure you want to drop out of the event "{selectedEvent?.title}"?</p>
                        <div className="flex justify-end space-x-3">
                            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300" onClick={() => setIsDialogOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300" onClick={() => handleDropout(selectedEvent?.id)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {isCreateDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
                            <h2 className="text-3xl font-bold text-white">Create New Event</h2>
                            <p className="text-gray-200 mt-2">Fill in the details to create your awesome event!</p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }} className="p-6 space-y-6">
                            {Object.entries(newEvent).map(([key, value]) => (
                                <div key={key} className="transition-all duration-300 hover:scale-[1.02]">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    {key === 'description' || key === 'additionalInfo' ? (
                                        <textarea
                                            value={value}
                                            onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            rows="3"
                                            required={key === 'description'}
                                        />
                                    ) : key === 'eventType' ? (
                                        <select
                                            value={value}
                                            onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            required
                                        >
                                            <option value="Individual">Individual</option>
                                            <option value="Team">Team</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={key === 'date' ? 'date' : key === 'capacity' ? 'number' : key === 'eventLink' ? 'url' : 'text'}
                                            value={value}
                                            onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            required={['title', 'date', 'description', 'category', 'hostedBy', 'capacity', 'eventCode'].includes(key)}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end space-x-3 mt-8">
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 transform hover:scale-105"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDetailsDialogOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
                        <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                        {Object.entries(selectedEvent).map(([key, value]) => key !== 'id' && key !== 'createdBy' && (
                            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === 'eventLink' ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{value}</a> : value}</p>
                        ))}
                        <div className="mt-6 flex justify-end">
                            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300" onClick={() => setIsDetailsDialogOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;