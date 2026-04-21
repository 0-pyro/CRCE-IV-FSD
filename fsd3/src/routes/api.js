import express from 'express';
const router = express.Router();

// 1. Use import instead of require
// 2. IMPORTANT: Add .js extension to the model paths
import Product from '../models/Product.js';
import Shout from '../models/Shout.js';
import Order from '../models/Order.js';

// --- PRODUCT ROUTES ---
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SHOUTBOX ROUTES ---
router.get('/shouts', async (req, res) => {
    try {
        const shouts = await Shout.find().sort({ createdAt: -1 }).limit(10);
        res.json(shouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/shouts', async (req, res) => {
    try {
        const newShout = new Shout(req.body);
        await newShout.save();
        res.json(newShout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- ORDER ROUTES ---
router.post('/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.json({ success: true, order: newOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. Use export default instead of module.exports
export default router;