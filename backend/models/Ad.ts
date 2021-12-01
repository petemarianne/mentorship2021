import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    picture: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    title: {type: String, required: true},
    description: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    status: {type: String, required: true, default: 'active'},
    price: {type: Number, required: true},
    sellerID: { type: Types.ObjectId, ref: 'User' },
    saleDate: {type: Date},
    closingDate: {type: Date}
});

const Ad = model('Ad', schema);

export default Ad;
