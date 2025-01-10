import { configDotenv } from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';

import fetchCryptoData from './services/fetchCryptoData.js';

const app = express();
app.use(json());

// Connect to MongoDB
connectDB();

// Set up routes
app.use('/api', apiRoutes);

app.get('/',(req,res) =>{
    res.json({"message" : "its working"})
}
)
// Start background job (run every 2 hours)
fetchCryptoData();
setInterval(fetchCryptoData, 2 * 60 * 60 * 1000);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
