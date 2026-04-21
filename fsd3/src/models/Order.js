import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    total: Number,
    customerName: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);