import mongoose, { Document, Schema } from 'mongoose';

export interface ISweet extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const SweetSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Sweet = mongoose.model<ISweet>('Sweet', SweetSchema);
export default Sweet;
