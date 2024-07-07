"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { IconClock, IconUsers, IconSettings, IconShield, IconCheck } from "@tabler/icons-react";

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
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
      options: {
        ...prev.options,
        [name]: newValue,
      },
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const submitForm = () => {
    alert("Training session created!");
  };

  const InputField = ({ label, name, type = "text", value, onChange, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );

  const CheckboxField = ({ label, name, checked, onChange }) => (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-300">{label}</label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Start Training</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="w-full lg:w-2/3 bg-gray-800 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <IconUsers className="mr-2" /> Training Details
            </h2>
            <InputField label="Training Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField 
              label="Training Type" 
              name="trainingType" 
              type="select" 
              value={formData.trainingType} 
              onChange={handleChange}
              options={[
                { value: "individual", label: "Individual" },
                { value: "group", label: "Group" },
              ]}
            />
            {formData.trainingType === "group" && (
              <>
                <InputField label="Group Name" name="group" value={formData.group} onChange={handleChange} />
                <InputField label="Number of Teams" name="teams" type="number" value={formData.teams} onChange={handleChange} />
              </>
            )}
            
            <h2 className="text-2xl font-bold my-6 flex items-center">
              <IconClock className="mr-2" /> Time Selection
            </h2>
            <InputField label="Start Time" name="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} />
            <InputField label="End Time" name="endTime" type="datetime-local" value={formData.endTime} onChange={handleChange} />
            
            <h2 className="text-2xl font-bold my-6 flex items-center">
              <IconShield className="mr-2" /> Select Services
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {["web", "pwn", "crypto", "misc"].map((service) => (
                <CheckboxField 
                  key={service}
                  label={service.charAt(0).toUpperCase() + service.slice(1)}
                  name={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                />
              ))}
            </div>
            
            <h2 className="text-2xl font-bold my-6 flex items-center">
              <IconSettings className="mr-2" /> Custom Range Options
            </h2>
            <InputField label="Tick Length (seconds)" name="tickLength" type="number" value={formData.options.tickLength} onChange={handleChange} />
            <InputField label="Flag Lifetime" name="flagLifetime" type="number" value={formData.options.flagLifetime} onChange={handleChange} />
            <CheckboxField label="Checker Randomization" name="checkerRandomization" checked={formData.options.checkerRandomization} onChange={handleChange} />
            <CheckboxField label="Source NAT" name="sourceNAT" checked={formData.options.sourceNAT} onChange={handleChange} />
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <IconCheck className="mr-2" /> Confirmation
            </h2>
            <div className="space-y-4">
              <ConfirmationItem label="Training Name" value={formData.name} />
              <ConfirmationItem label="Training Type" value={formData.trainingType} />
              {formData.trainingType === "group" && (
                <>
                  <ConfirmationItem label="Group Name" value={formData.group} />
                  <ConfirmationItem label="Number of Teams" value={formData.teams} />
                </>
              )}
              <ConfirmationItem label="Start Time" value={formData.startTime} />
              <ConfirmationItem label="End Time" value={formData.endTime} />
              <ConfirmationItem label="Services" value={formData.services.join(", ")} />
              <ConfirmationItem label="Tick Length" value={`${formData.options.tickLength} seconds`} />
              <ConfirmationItem label="Flag Lifetime" value={formData.options.flagLifetime} />
              <ConfirmationItem label="Checker Randomization" value={formData.options.checkerRandomization ? "Enabled" : "Disabled"} />
              <ConfirmationItem label="Source NAT" value={formData.options.sourceNAT ? "Enabled" : "Disabled"} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitForm}
              className="w-full px-6 py-3 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
            >
              Confirm and Deploy
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ConfirmationItem = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-400">{label}</h3>
    <p className="text-white">{value}</p>
  </div>
);

export default StartTraining;