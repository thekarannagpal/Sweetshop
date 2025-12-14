import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();
console.log('Environment PORT:', process.env.PORT);
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

import authRoutes from './routes/authRoutes';
import sweetRoutes from './routes/sweetRoutes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.get('/', (req, res) => {
    res.send('Sweet Shop API is running');
});

// Database Connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
