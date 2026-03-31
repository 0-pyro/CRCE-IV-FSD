const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

let students = [
    { id: 1, name: "John Fsd", branch: "CE", year: 3 },
    { id: 2, name: "Jason Fsd", branch: "CE", year: 3 },
    { id: 3, name: "Door James", branch: "CE", year: 1 },
    { id: 4, name: "Kitty McCat", branch: "CE", year: 4 },
    { id: 5, name: "Grigori Rasputin", branch: "CE", year: 2 }
]

app.get("/students", (req, res) => {
    res.json(students)
})

app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) return res.status(404).send("Student not found")
    res.json(student)
})

app.post("/students", (req, res) => {
    const { name, branch, year } = req.body

    if (!name || !branch || !year) return res.status(400).send("Missing fields")

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1, name, branch, year: parseInt(year)
    }

    students.push(newStudent)
    res.status(201).json(newStudent)
})

app.patch("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) return res.status(404).send("Student not found")
    if (req.body.name) student.name = req.body.name;
    if (req.body.branch) student.branch = req.body.branch;
    if (req.body.year) student.year = parseInt(req.body.year)

    res.json(student)
})

app.delete("/students/:id", (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id))
    if (studentIndex === -1) return res.status(404).send("Student not found")

    const deleted = students.splice(studentIndex, 1)
    res.json(deleted)
})

app.listen(PORT, () => {
    console.log(`Running at http://localhost:3000`)
})