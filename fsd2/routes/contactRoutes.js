const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

router.post('/', async (req, res) => {
    try {
        const { name, email, phone } = req.body
        if (!name || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const newContact = new Contact({ name, email, phone })
        await newContact.save()
        res.status(201).json(newContact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.json(contacts)
})

router.delete('/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

module.exports = router