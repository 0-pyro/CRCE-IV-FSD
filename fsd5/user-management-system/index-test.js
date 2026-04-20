const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function runAnalysis() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB. Starting Index Analysis...\n");

        const queries = [
            {
                name: "Unindexed Field (Forced COLLSCAN)",
                query: User.find({ age: 30 })
            },
            {
                name: "Single Field Index (name: 1)",
                query: User.find({ name: "Jane Doe" })
            },
            {
                name: "Compound Index (email: 1, age: -1)",
                query: User.find({ email: "jane.doe@example.com", age: { $gt: 25 } })
            },
            {
                name: "Multikey Index (hobbies: 1)",
                query: User.find({ hobbies: "Coding" })
            },
            {
                name: "Text Index (bio: 'text')",
                query: User.find({ $text: { $search: "developer" } })
            },
            {
                name: "Hashed Index (userId: 'hashed')",
                query: User.find({ userId: "user_id_002" })
            },
            {
                name: "TTL Index (createdAt: 1)",
                query: User.find({ createdAt: { $gt: new Date(Date.now() - 3600000) } })
            }
        ];

        for (const item of queries) {
            const explain = await item.query.explain("executionStats");
            const stats = explain.executionStats;

            const winningPlan = explain.queryPlanner.winningPlan;
            const stage = winningPlan.stage || winningPlan.inputStage.stage;

            const complexity = stage === "COLLSCAN" ? "O(N) - Linear (Collection Scan)" : "O(log N) - Logarithmic (Index Scan)";

            console.log(`--- Analysis: ${item.name} ---`);
            console.log(`Winning Stage:      ${stage}`);
            console.log(`Execution Time:     ${stats.executionTimeMillis} ms`);
            console.log(`Keys Examined:      ${stats.totalKeysExamined}`);
            console.log(`Docs Examined:      ${stats.totalDocsExamined}`);
            console.log(`Complexity:         ${complexity}`);
            console.log(`In-Memory Sort:     ${stats.executionStages.type === 'SORT' ? 'Yes' : 'No'}`);
            console.log("\n");
        }

    } catch (error) {
        console.error("Analysis Error:", error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}

runAnalysis();