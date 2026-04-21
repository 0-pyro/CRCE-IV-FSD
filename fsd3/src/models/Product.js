import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    description: String,
    specialOffer: { type: Boolean, default: false },
    discount: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);