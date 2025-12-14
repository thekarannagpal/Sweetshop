import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

export const app = express();
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
        // Only listen if not running in Vercel (serverless)
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } else {
            // For Vercel/Serverless, we just export the app
            // But locally we need to listen
            // Note: Vercel sets NODE_ENV=production
            // A better check might be if (require.main === module) but with TS/ESM that's tricky
            // Let's rely on standard logic or just always listen and Vercel handles it via rewrite? 
            // Actually Vercel serverless functions SHOULD NOT listen themselves usually.
            // But existing express apps can be wrapped. 
            // Simple fix: Check for VERCEL env var
            if (!process.env.VERCEL) {
                app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                });
            }
        }
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
