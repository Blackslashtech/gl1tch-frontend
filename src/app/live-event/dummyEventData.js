// dummyEventData.js

const generateHistoricalScores = (teams, hours) => {
    const startTime = new Date("2024-06-15T00:00:00").getTime();
    return teams.map(team => ({
        name: team.name,
        scores: Array.from({ length: hours }, (_, i) => ({
            time: new Date(startTime + i * 3600000).toISOString(),
            score: Math.floor(team.score * (i + 1) / hours)
        }))
    }));
};

export const dummyEvent = {
    title: "Global Cybersecurity Challenge 2024",
    description: "An intense 48-hour competition testing skills in various cybersecurity domains.",
    date: "2024-06-15 to 2024-06-17",
    host: "International Cybersecurity Association",
    stats: {
        totalTeams: 50,
        totalChallenges: 25,
        completedChallenges: 18,
        ongoingChallenges: 7,
        totalFlags: 75,
        capturedFlags: 62,
    },
    teams: [
        { name: "Binary Bandits", score: 4350, solvedChallenges: 20, lastFlag: "SQL_Injection_Master" },
        { name: "Crypto Crusaders", score: 4120, solvedChallenges: 19, lastFlag: "AES_Cracker" },
        { name: "Firewall Phantoms", score: 3980, solvedChallenges: 18, lastFlag: "Packet_Sniffer_Pro" },
        { name: "Malware Marauders", score: 3850, solvedChallenges: 17, lastFlag: "Rootkit_Revealer" },
        { name: "Zero-Day Heroes", score: 3720, solvedChallenges: 16, lastFlag: "Buffer_Overflow_Buster" },
        { name: "Phishing Phoenixes", score: 3590, solvedChallenges: 15, lastFlag: "Social_Engineer_Supreme" },
        { name: "Trojan Troopers", score: 3460, solvedChallenges: 14, lastFlag: "RAT_Catcher" },
        { name: "Virus Vanguard", score: 3330, solvedChallenges: 13, lastFlag: "Polymorphic_Code_Cracker" },
        { name: "Exploit Experts", score: 3200, solvedChallenges: 12, lastFlag: "RCE_Master" },
        { name: "Cipher Sentinels", score: 3070, solvedChallenges: 11, lastFlag: "RSA_Breaker" },
    ],
    challenges: [
        { name: "Web App Wonderland", category: "Web", status: "Completed", difficulty: "Hard", solves: 15, points: 500 },
        { name: "Cryptography Conundrum", category: "Crypto", status: "Ongoing", difficulty: "Expert", solves: 7, points: 750 },
        { name: "Network Nemesis", category: "Network", status: "Completed", difficulty: "Medium", solves: 22, points: 350 },
        { name: "Binary Battlefield", category: "Pwn", status: "Ongoing", difficulty: "Expert", solves: 5, points: 800 },
        { name: "Forensics Frenzy", category: "Forensics", status: "Completed", difficulty: "Medium", solves: 18, points: 400 },
        { name: "Reverse Engineering Riddle", category: "Reverse", status: "Ongoing", difficulty: "Hard", solves: 10, points: 600 },
        { name: "OSINT Odyssey", category: "OSINT", status: "Completed", difficulty: "Easy", solves: 35, points: 200 },
        { name: "Malware Maze", category: "Malware", status: "Ongoing", difficulty: "Hard", solves: 8, points: 650 },
    ],
    flags: [
        { team: "Binary Bandits", flag: "SQL_Injection_Master", points: 500, timestamp: "2024-06-16T14:23:00" },
        { team: "Crypto Crusaders", flag: "AES_Cracker", points: 750, timestamp: "2024-06-16T15:45:00" },
        { team: "Firewall Phantoms", flag: "Packet_Sniffer_Pro", points: 350, timestamp: "2024-06-16T16:12:00" },
        { team: "Malware Marauders", flag: "Rootkit_Revealer", points: 600, timestamp: "2024-06-16T17:03:00" },
        { team: "Zero-Day Heroes", flag: "Buffer_Overflow_Buster", points: 800, timestamp: "2024-06-16T18:30:00" },
    ],
    historicalScores: generateHistoricalScores([
        { name: "Binary Bandits", score: 4350 },
        { name: "Crypto Crusaders", score: 4120 },
        { name: "Firewall Phantoms", score: 3980 },
        { name: "Malware Marauders", score: 3850 },
        { name: "Zero-Day Heroes", score: 3720 },
    ], 48)
};