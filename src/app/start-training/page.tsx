"use client";
import React, { useState } from "react";
import Header from "../components/Header";

const StartTraining = () => {
  const [formData, setFormData] = useState({
    name: "",
    trainingType: "individual",
    group: "",
    teams: 1,
    startTime: "",
    endTime: "",
    services: [],
    options: {
      tickLength: 120,
      flagLifetime: 5,
      checkerRandomization: true,
      sourceNAT: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
      options: {
        ...formData.options,
        [name]: newValue,
      },
    });
  };

  const handleServiceChange = (service) => {
    let updatedServices = [...formData.services];
    if (updatedServices.includes(service)) {
      updatedServices = updatedServices.filter((s) => s !== service);
    } else {
      updatedServices.push(service);
    }
    setFormData({ ...formData, services: updatedServices });
  };

  const submitForm = () => {
    alert("Training session created!");
  };

  return (
    <div className="container mx-auto p-4 dark:bg-background">
      <Header />
      <div className="flex justify-between">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Start Training</h1>
          <div>
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Training Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Training Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Training Type</label>
              <select
                name="trainingType"
                value={formData.trainingType}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              >
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>
            {formData.trainingType === "group" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground">Group Name</label>
                  <input
                    type="text"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground">Number of Teams</label>
                  <input
                    type="number"
                    name="teams"
                    value={formData.teams}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
                  />
                </div>
              </>
            )}
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Time Selection</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">End Time</label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              />
            </div>
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Select Services</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Services</label>
              <div className="grid grid-cols-2 gap-4">
                {["web", "pwn", "crypto", "misc"].map((service) => (
                  <div key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      id={service}
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="mr-2"
                    />
                    <label htmlFor={service} className="text-sm text-foreground">{service}</label>
                  </div>
                ))}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Custom Range Options</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Tick Length (seconds)</label>
              <input
                type="number"
                name="tickLength"
                value={formData.options.tickLength}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Flag Lifetime</label>
              <input
                type="number"
                name="flagLifetime"
                value={formData.options.flagLifetime}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-input text-foreground"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Checker Randomization</label>
              <input
                type="checkbox"
                name="checkerRandomization"
                checked={formData.options.checkerRandomization}
                onChange={handleChange}
                className="mr-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground">Source NAT</label>
              <input
                type="checkbox"
                name="sourceNAT"
                checked={formData.options.sourceNAT}
                onChange={handleChange}
                className="mr-2"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-card p-4 rounded-lg shadow-md dark:bg-card">
            <h2 className="text-xl font-bold mb-4 dark:text-foreground">Confirmation</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Training Name</h3>
              <p className="text-foreground">{formData.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Training Type</h3>
              <p className="text-foreground">{formData.trainingType}</p>
            </div>
            {formData.trainingType === "group" && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Group Name</h3>
                  <p className="text-foreground">{formData.group}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Number of Teams</h3>
                  <p className="text-foreground">{formData.teams}</p>
                </div>
              </>
            )}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Start Time</h3>
              <p className="text-foreground">{formData.startTime}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">End Time</h3>
              <p className="text-foreground">{formData.endTime}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Services</h3>
              <p className="text-foreground">{formData.services.join(", ")}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Custom Options</h3>
              <p className="text-foreground">Tick Length: {formData.options.tickLength} seconds</p>
              <p className="text-foreground">Flag Lifetime: {formData.options.flagLifetime}</p>
              <p className="text-foreground">
                Checker Randomization: {formData.options.checkerRandomization ? "Enabled" : "Disabled"}
              </p>
              <p className="text-foreground">
                Source NAT: {formData.options.sourceNAT ? "Enabled" : "Disabled"}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitForm}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Confirm and Deploy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTraining;
