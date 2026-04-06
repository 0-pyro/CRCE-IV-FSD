const mongoose = require('mongoose')
const User = require('./models/User')
require('dotenv').config()

async function runAnalysis() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Text Search PerfAnalysis")
    const stats = await User.find({ $text: { $search: "developer" } }).explain("executionStats")

    console.log("Execution Time (ms):", stats.executionStats.executionTimeMillis)
    console.log("Total Docs Examined:", stats.executionStats.totalDocsExamined)
    console.log("Total Keys Examined:", stats.executionStats.totalKeysExamined)

    process.exit()
}

runAnalysis()