const express = require("express")
const morgan = require("morgan")

const app = express()
app.set("view engine", "ejs")
const PORT = 3000;

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/profile", (req, res) => {
    res.render("profile", {
        name: "Arnav",
        branch: "CE",
        year: "SE"
    })
})

app.get('/', (req, res) => {
    res.send("Welcome to the Student Inforomation Portal")
})

app.get("/about", (req, res) => {
    res.send(`
        Name: John Doe
        Roll No: 23
        Course: Computer Engi
        `)
})

app.get("/contact", (req, res) => {
    res.json({
        email: "johndoe@example.com",
        phone: "9312451029"
    })
})

app.post("/register", (req, res) => {
    res.status(201).send("Student registered Succesfully")
})

app.put("/update", (req, res) => {
    res.status(200).send("Student record updated succesfully")
})

app.post("/submit-form", (req, res) => {
    const { studentName, branch, year } = req.body;
    res.send(`
        <h1>Submission Received</h1>
        <p>Student Name: ${studentName}</p>
        <p>Branch: ${branch}</p>
        <p>Year: ${year}</p>
        <a href="/">Go Back</a>
        `)
})

app.get("/profile", (req, res) => {
    res.render("profile", {
        name: "Arnav",
        branch: "CE",
        year: "SE"
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})