import mongoose, { Schema, Document } from 'mongoose';

interface ICrypto extends Document {
    name: string;
    price: number;
    marketCap: number;
    "24hchange": number;
    updatedAt: Date;
}

const CryptoSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    "24hchange": { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICrypto>('Crypto', CryptoSchema);
