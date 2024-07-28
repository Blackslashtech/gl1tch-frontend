"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { FiUser, FiCreditCard, FiPackage, FiClock } from "react-icons/fi";

const ManageProfile = () => {
    const [profile, setProfile] = useState({
        displayName: "John Doe",
        email: "johndoe@example.com",
        country: "USA",
    });
    const [billingInfo, setBillingInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [plan, setPlan] = useState("Basic");
    const [usage, setUsage] = useState({
        teamServiceHours: 10,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo((prevBillingInfo) => ({
            ...prevBillingInfo,
            [name]: value,
        }));
    };

    const handlePlanChange = (e) => {
        setPlan(e.target.value);
    };

    const handleSaveProfile = () => {
        console.log("Profile saved:", profile);
    };

    const handleSaveBilling = () => {
        console.log("Billing info saved:", billingInfo);
    };

    const CardWrapper = ({ icon, title, children }) => (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-center mb-4">
                {icon}
                <h2 className="text-2xl font-bold ml-2 dark:text-white">{title}</h2>
            </div>
            {children}
        </motion.div>
    );

    const Input = ({ label, ...props }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
                {...props}
                className="w-full px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    const Button = ({ children, ...props }) => (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md shadow-md hover:shadow-lg transition duration-300"
            {...props}
        >
            {children}
        </motion.button>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <Header />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Manage Your Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CardWrapper icon={<FiUser className="w-6 h-6 text-blue-500" />} title="Profile Information">
                        <Input label="Display Name" name="displayName" value={profile.displayName} onChange={handleInputChange} />
                        <Input label="Email" type="email" name="email" value={profile.email} onChange={handleInputChange} />
                        <Input label="Country" name="country" value={profile.country} onChange={handleInputChange} />
                        <Button onClick={handleSaveProfile}>Save Profile</Button>
                    </CardWrapper>

                    <CardWrapper icon={<FiCreditCard className="w-6 h-6 text-green-500" />} title="Billing Information">
                        <Input label="Card Number" name="cardNumber" value={billingInfo.cardNumber} onChange={handleBillingChange} />
                        <Input label="Expiry Date" name="expiryDate" value={billingInfo.expiryDate} onChange={handleBillingChange} />
                        <Input label="CVV" name="cvv" value={billingInfo.cvv} onChange={handleBillingChange} />
                        <Button onClick={handleSaveBilling}>Save Billing Info</Button>
                    </CardWrapper>

                    <CardWrapper icon={<FiPackage className="w-6 h-6 text-purple-500" />} title="Subscription Plan">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Plan</label>
                            <select
                                value={plan}
                                onChange={handlePlanChange}
                                className="w-full px-3 py-2 text-gray-700 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Pay as you go">Pay as you go ($0.50 per team-service-hour)</option>
                                <option value="Basic">Basic (30 team-service-hours, $10/month)</option>
                                <option value="Premium">Premium (80 team-service-hours, $20/month)</option>
                            </select>
                        </div>
                        <Button>Update Plan</Button>
                    </CardWrapper>

                    <CardWrapper icon={<FiClock className="w-6 h-6 text-yellow-500" />} title="Usage Statistics">
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Team Service Hours Used</p>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{usage.teamServiceHours}</p>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500" 
                                style={{ width: `${(usage.teamServiceHours / 30) * 100}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {30 - usage.teamServiceHours} hours remaining this month
                        </p>
                    </CardWrapper>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;