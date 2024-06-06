"use client";
import React, { useState } from "react";
import Header from "../components/Header";

const CustomTraining = () => {
    const [trainingName, setTrainingName] = useState("");
    const [trainingType, setTrainingType] = useState("individual");
    const [groupDetails, setGroupDetails] = useState({
        groupName: "",
        teams: 1,
    });
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [services, setServices] = useState([]);
    const [customOptions, setCustomOptions] = useState({
        tickLength: 120,
        flagLifetime: 5,
        checkerRandomization: true,
        sourceNAT: true,
    });

    const handleServiceChange = (service) => {
        setServices((prevServices) =>
            prevServices.includes(service)
                ? prevServices.filter((s) => s !== service)
                : [...prevServices, service]
        );
    };

    const handleOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomOptions((prevOptions) => ({
            ...prevOptions,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        console.log("Training details submitted", {
            trainingName,
            trainingType,
            groupDetails,
            startTime,
            endTime,
            services,
            customOptions,
        });
    };

    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Custom Training Setup</h1>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Training Name</label>
                    <input
                        type="text"
                        value={trainingName}
                        onChange={(e) => setTrainingName(e.target.value)}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Training Type</label>
                    <select
                        value={trainingType}
                        onChange={(e) => setTrainingType(e.target.value)}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    >
                        <option value="individual">Individual</option>
                        <option value="group">Group</option>
                    </select>
                </div>

                {trainingType === "group" && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium dark:text-foreground">Group Name</label>
                        <input
                            type="text"
                            value={groupDetails.groupName}
                            onChange={(e) =>
                                setGroupDetails((prevDetails) => ({
                                    ...prevDetails,
                                    groupName: e.target.value,
                                }))
                            }
                            className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                        />
                        <label className="block text-sm font-medium dark:text-foreground mt-4">Number of Teams</label>
                        <input
                            type="number"
                            min="1"
                            value={groupDetails.teams}
                            onChange={(e) =>
                                setGroupDetails((prevDetails) => ({
                                    ...prevDetails,
                                    teams: e.target.value,
                                }))
                            }
                            className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">End Time</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Select Services</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {["Web", "Pwn", "Crypto", "Misc"].map((service) => (
                            <div key={service} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={service}
                                    name={service}
                                    checked={services.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor={service} className="ml-2 text-sm font-medium dark:text-foreground">
                                    {service}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold dark:text-foreground">Custom Options</h3>
                    <div className="mt-2">
                        <label className="block text-sm font-medium dark:text-foreground">Tick Length (seconds)</label>
                        <input
                            type="number"
                            name="tickLength"
                            value={customOptions.tickLength}
                            onChange={handleOptionChange}
                            className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium dark:text-foreground">Flag Lifetime (minutes)</label>
                        <input
                            type="number"
                            name="flagLifetime"
                            value={customOptions.flagLifetime}
                            onChange={handleOptionChange}
                            className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium dark:text-foreground">Checker Randomization</label>
                        <input
                            type="checkbox"
                            name="checkerRandomization"
                            checked={customOptions.checkerRandomization}
                            onChange={handleOptionChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium dark:text-foreground">Source NAT</label>
                        <input
                            type="checkbox"
                            name="sourceNAT"
                            checked={customOptions.sourceNAT}
                            onChange={handleOptionChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                >
                    Confirm Details and Deploy
                </button>
            </div>
        </div>
    );
};

export default CustomTraining;
