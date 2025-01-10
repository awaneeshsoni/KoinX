import mongoose from 'mongoose';

const CryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
}, { timestamps: true });

const Crypto = mongoose.model('Crypto', CryptoSchema);
export default Crypto;
