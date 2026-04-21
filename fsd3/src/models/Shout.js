import mongoose from 'mongoose';
const shoutSchema = new mongoose.Schema({
    name: { type: String, default: 'Anonymous' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Shout', shoutSchema);