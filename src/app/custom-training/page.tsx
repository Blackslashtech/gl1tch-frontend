"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { FiClock, FiUsers, FiSettings, FiShield, FiDollarSign } from 'react-icons/fi';

const CustomTraining = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        trainingName: "",
        trainingType: "individual",
        groupName: "",
        teams: 1,
        teamAllocation: "random",
        startTime: "",
        endTime: "",
        services: [],
        randomizeServices: false,
        customOptions: {
            tickLength: 120,
            flagLifetime: 5,
            checkerRandomization: true,
            sourceNAT: true,
        },
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleServiceChange = (service) => {
        setFormData(prevData => ({
            ...prevData,
            services: prevData.services.includes(service)
                ? prevData.services.filter(s => s !== service)
                : [...prevData.services, service]
        }));
    };

    const handleCustomOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            customOptions: {
                ...prevData.customOptions,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSubmit = () => {
        console.log("Training details submitted", formData);
        // Here you would typically send the data to your backend
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Basic Information</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Training Name</label>
                            <input
                                type="text"
                                name="trainingName"
                                value={formData.trainingName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Training Type</label>
                            <select
                                name="trainingType"
                                value={formData.trainingType}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="individual">Individual</option>
                                <option value="group">Group</option>
                            </select>
                        </div>
                        {formData.trainingType === "group" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Group Name</label>
                                    <input
                                        type="text"
                                        name="groupName"
                                        value={formData.groupName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Number of Teams</label>
                                    <input
                                        type="number"
                                        name="teams"
                                        min="1"
                                        value={formData.teams}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Team Allocation</label>
                                    <select
                                        name="teamAllocation"
                                        value={formData.teamAllocation}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="random">Randomize</option>
                                        <option value="manual">Manual Placement</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Schedule</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Start Time</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">End Time</label>
                            <input
                                type="datetime-local"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Services</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {['Web', 'Pwn', 'Crypto', 'Misc'].map(service => (
                                <div key={service} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={service}
                                        checked={formData.services.includes(service)}
                                        onChange={() => handleServiceChange(service)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={service} className="dark:text-gray-300">{service}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="randomizeServices"
                                name="randomizeServices"
                                checked={formData.randomizeServices}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label htmlFor="randomizeServices" className="dark:text-gray-300">Randomize Services</label>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Custom Options</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tick Length (30-360 seconds)</label>
                            <input
                                type="number"
                                name="tickLength"
                                min="30"
                                max="360"
                                value={formData.customOptions.tickLength}
                                onChange={handleCustomOptionChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Flag Lifetime (3-unlimited minutes)</label>
                            <input
                                type="number"
                                name="flagLifetime"
                                min="3"
                                value={formData.customOptions.flagLifetime}
                                onChange={handleCustomOptionChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="checkerRandomization"
                                name="checkerRandomization"
                                checked={formData.customOptions.checkerRandomization}
                                onChange={handleCustomOptionChange}
                                className="mr-2"
                            />
                            <label htmlFor="checkerRandomization" className="dark:text-gray-300">Checker Randomization</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="sourceNAT"
                                name="sourceNAT"
                                checked={formData.customOptions.sourceNAT}
                                onChange={handleCustomOptionChange}
                                className="mr-2"
                            />
                            <label htmlFor="sourceNAT" className="dark:text-gray-300">Source NAT</label>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Confirmation</h2>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                            <h3 className="font-bold mb-2 dark:text-white">Training Details</h3>
                            <p className="dark:text-gray-300">Name: {formData.trainingName}</p>
                            <p className="dark:text-gray-300">Type: {formData.trainingType}</p>
                            {formData.trainingType === "group" && (
                                <>
                                    <p className="dark:text-gray-300">Group: {formData.groupName}</p>
                                    <p className="dark:text-gray-300">Teams: {formData.teams}</p>
                                    <p className="dark:text-gray-300">Team Allocation: {formData.teamAllocation}</p>
                                </>
                            )}
                            <p className="dark:text-gray-300">Start: {formData.startTime}</p>
                            <p className="dark:text-gray-300">End: {formData.endTime}</p>
                            <p className="dark:text-gray-300">Services: {formData.services.join(", ")}</p>
                            <p className="dark:text-gray-300">Custom Options:</p>
                            <ul className="list-disc list-inside dark:text-gray-300">
                                <li>Tick Length: {formData.customOptions.tickLength}s</li>
                                <li>Flag Lifetime: {formData.customOptions.flagLifetime} minutes</li>
                                <li>Checker Randomization: {formData.customOptions.checkerRandomization ? "Enabled" : "Disabled"}</li>
                                <li>Source NAT: {formData.customOptions.sourceNAT ? "Enabled" : "Disabled"}</li>
                            </ul>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
                            <h3 className="font-bold mb-2 dark:text-white">Billing</h3>
                            <p className="dark:text-gray-300">Estimated cost: $XX.XX</p>
                            <p className="dark:text-gray-300">Based on your current plan: [Plan Name]</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Custom Training Setup</h1>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between mb-8">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                className={`flex items-center ${s <= step ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s <= step ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {s === 1 && <FiUsers />}
                                    {s === 2 && <FiClock />}
                                    {s === 3 && <FiShield />}
                                    {s === 4 && <FiSettings />}
                                    {s === 5 && <FiDollarSign />}
                                </div>
                                {s < 5 && <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                            </div>
                        ))}
                    </div>

                    {renderStep()}

                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded"
                            >
                                Previous
                            </button>
                        )}
                        {step < 5 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="px-4 py-2 bg-blue-500 text-white rounded ml-auto"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-500 text-white rounded ml-auto"
                            >
                                Deploy Range
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTraining;