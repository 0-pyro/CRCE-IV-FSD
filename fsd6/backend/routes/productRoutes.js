const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post('/', async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.json(savedProduct)
})

router.get('/', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

router.put('/:id', async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
})

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

module.exports = router