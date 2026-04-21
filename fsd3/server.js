import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// 1. Import your routes here at the top
// Note: You must include the '.js' extension for local files in ES modules
import apiRoutes from './src/routes/api.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fsd3db')
    .then(() => console.log("Connected to NostalgiaDB"))
    .catch(err => console.log(err));

// 2. Use the imported variable instead of require
app.use('/api', apiRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Backend spinning on ${PORT}`));