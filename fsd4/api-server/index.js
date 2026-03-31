const express = require("express")
const axios = require("axios")
const path = require("path")

const app = express()
const PORT = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index", { joke: null, name: null, error: null })
})

app.post("/get-joke", async (req, res) => {
    const userName = req.body.name

    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any")
        const result = response.data

        res.render("index", {
            name: userName,
            joke: result,
            error: null
        })
    }
    catch (error) {
        console.error("Error fetching joke: ", error.message)
        res.render("index", {
            joke: null,
            name: userName,
            error: "Skill Issue"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})