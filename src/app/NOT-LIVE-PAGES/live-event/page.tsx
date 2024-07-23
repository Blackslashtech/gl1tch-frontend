// LiveCyberEvent.jsx
"use client";
import React, { useState } from "react";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Header from "../components/Header";
import { dummyEvent } from "./dummyEventData";

Chart.register(...registerables);

const LiveCyberEvent = () => {
    const [event] = useState(dummyEvent);
    const [activeTab, setActiveTab] = useState("overview");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTeams = event.teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const TabButton = ({ name, label }) => (
        <button
            className={`px-4 py-2 font-semibold rounded-t-lg ${activeTab === name ? 'bg-background text-primary' : 'bg-secondary text-secondary-foreground'}`}
            onClick={() => setActiveTab(name)}
        >
            {label}
        </button>
    );

    const Card = ({ title, children, className = "" }) => (
        <div className={`bg-card text-card-foreground p-4 rounded-lg shadow-md ${className}`}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            {children}
        </div>
    );

    const scoreData = {
        labels: event.teams.map(team => team.name),
        datasets: [{
            label: 'Team Scores',
            data: event.teams.map(team => team.score),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const challengeData = {
        labels: event.challenges.map(c => c.name),
        datasets: [{
            label: 'Solves',
            data: event.challenges.map(c => c.solves),
            backgroundColor: event.challenges.map(c => 
                c.status === "Completed" ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 205, 86, 0.6)'
            ),
        }]
    };

    const categoryData = {
        labels: [...new Set(event.challenges.map(c => c.category))],
        datasets: [{
            label: 'Challenges per Category',
            data: [...new Set(event.challenges.map(c => c.category))].map(category => 
                event.challenges.filter(c => c.category === category).length
            ),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 199, 199, 0.6)',
                'rgba(83, 102, 255, 0.6)',
            ],
        }]
    };

    const scoreOverTimeData = {
        labels: event.historicalScores[0].scores.map(s => new Date(s.time).toLocaleTimeString()),
        datasets: event.historicalScores.map((team, index) => ({
            label: team.name,
            data: team.scores.map(s => s.score),
            fill: false,
            borderColor: `hsl(${index * 360 / event.historicalScores.length}, 70%, 50%)`,
            tension: 0.1
        }))
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Header />
            <div className="container mx-auto p-4 pt-24">
                <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
                
                <div className="mb-4 border-b border-border">
                    <TabButton name="overview" label="Overview" />
                    <TabButton name="scoreboard" label="Scoreboard" />
                    <TabButton name="challenges" label="Challenges" />
                    <TabButton name="flags" label="Flags" />
                </div>

                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card title="Event Info" className="col-span-1 md:col-span-2 lg:col-span-3">
                            <p>{event.description}</p>
                            <p className="mt-2">Date: {event.date}</p>
                            <p>Hosted by: <span className="font-bold">{event.host}</span></p>
                        </Card>
                        <Card title="Event Stats">
                            <ul>
                                {Object.entries(event.stats).map(([key, value]) => (
                                    <li key={key} className="flex justify-between">
                                        <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                        <span className="font-bold">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                        <Card title="Top 5 Team Scores">
                            <div className="h-64">
                                <Bar 
                                    data={{
                                        labels: event.teams.slice(0, 5).map(team => team.name),
                                        datasets: [{
                                            label: 'Score',
                                            data: event.teams.slice(0, 5).map(team => team.score),
                                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1
                                        }]
                                    }} 
                                    options={{ maintainAspectRatio: false, indexAxis: 'y' }} 
                                />
                            </div>
                        </Card>
                        <Card title="Challenge Categories">
                            <div className="h-64">
                                <Doughnut data={categoryData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </Card>
                        <Card title="Score Over Time" className="col-span-1 md:col-span-2 lg:col-span-3">
                            <div className="h-96">
                                <Line 
                                    data={scoreOverTimeData} 
                                    options={{ 
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Time'
                                                }
                                            },
                                            y: {
                                                title: {
                                                    display: true,
                                                    text: 'Score'
                                                }
                                            }
                                        }
                                    }} 
                                />
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === "scoreboard" && (
                    <Card title="Scoreboard">
                        <input
                            type="text"
                            placeholder="Search teams..."
                            className="w-full p-2 mb-4 border rounded bg-input text-foreground"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="p-2 text-left">Rank</th>
                                        <th className="p-2 text-left">Team</th>
                                        <th className="p-2 text-left">Score</th>
                                        <th className="p-2 text-left">Solved Challenges</th>
                                        <th className="p-2 text-left">Last Flag</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTeams
                                        .sort((a, b) => b.score - a.score)
                                        .map((team, index) => (
                                            <tr key={team.name} className="border-b border-muted">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2 font-bold">{team.name}</td>
                                                <td className="p-2">{team.score}</td>
                                                <td className="p-2">{team.solvedChallenges}</td>
                                                <td className="p-2">{team.lastFlag}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {activeTab === "challenges" && (
                    <Card title="Challenges">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="p-2 text-left">Name</th>
                                        <th className="p-2 text-left">Category</th>
                                        <th className="p-2 text-left">Status</th>
                                        <th className="p-2 text-left">Difficulty</th>
                                        <th className="p-2 text-left">Solves</th>
                                        <th className="p-2 text-left">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.challenges.map((challenge) => (
                                        <tr key={challenge.name} className="border-b border-muted">
                                            <td className="p-2 font-bold">{challenge.name}</td>
                                            <td className="p-2">{challenge.category}</td>
                                            <td className="p-2">{challenge.status}</td>
                                            <td className="p-2">{challenge.difficulty}</td>
                                            <td className="p-2">{challenge.solves}</td>
                                            <td className="p-2">{challenge.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {activeTab === "flags" && (
                    <Card title="Recent Flag Captures">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="p-2 text-left">Team</th>
                                        <th className="p-2 text-left">Flag</th>
                                        <th className="p-2 text-left">Points</th>
                                        <th className="p-2 text-left">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.flags.map((flag, index) => (
                                        <tr key={index} className="border-b border-muted">
                                            <td className="p-2 font-bold">{flag.team}</td>
                                            <td className="p-2">{flag.flag}</td>
                                            <td className="p-2">{flag.points}</td>
                                            <td className="p-2">{new Date(flag.timestamp).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default LiveCyberEvent;