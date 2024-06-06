"use client";
import React, { useState } from "react";
import Header from "../components/Header";

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo((prevBillingInfo) => ({
            ...prevBillingInfo,
            [name]: value,
        }));
    };

    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlan(e.target.value);
    };

    const handleSaveProfile = () => {
        console.log("Profile saved:", profile);
    };

    const handleSaveBilling = () => {
        console.log("Billing info saved:", billingInfo);
    };

    return (
        <div className="container mx-auto p-4 dark:bg-background">
            <Header />
            <h1 className="text-3xl font-bold mb-4 dark:text-foreground">Manage Profile</h1>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-foreground">Profile Information</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={profile.displayName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={profile.country}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Save Profile
                </button>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-foreground">Billing Information</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={billingInfo.cardNumber}
                        onChange={handleBillingChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Expiry Date</label>
                    <input
                        type="text"
                        name="expiryDate"
                        value={billingInfo.expiryDate}
                        onChange={handleBillingChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={billingInfo.cvv}
                        onChange={handleBillingChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    />
                </div>
                <button
                    onClick={handleSaveBilling}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Save Billing Info
                </button>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-foreground">Subscription Plan</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium dark:text-foreground">Select Plan</label>
                    <select
                        value={plan}
                        onChange={handlePlanChange}
                        className="mt-1 p-2 block w-full dark:bg-input dark:text-foreground rounded-md border border-gray-300"
                    >
                        <option value="Pay as you go">Pay as you go</option>
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-background rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 dark:text-foreground">Usage</h2>
                <div className="mb-4">
                    <p className="text-sm font-medium dark:text-foreground">Team Service Hours Used</p>
                    <p className="text-lg dark:text-foreground">{usage.teamServiceHours}</p>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;
