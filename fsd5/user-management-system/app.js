require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/User")

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to DB")).catch(err => console.error("ConError", err))

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

app.get("/users", async (req, res) => {
    try {
        const query = {}
        if (req.query.name) query.name = req.query.name;
        if (req.query.age) query.age = req.query.age;
        if (req.query.hobby) query.hobbies = req.query.hobby;
        if (req.query.search) query.$text = { $search: req.query.search }

        const users = await User.find(query).sort({ createdAt: -1 }).limit(parseInt(req.query.limit) || 10)
        res.send(users)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) return res.status(404).send()
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).send()
        res.send({ message: "user deleted" })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))