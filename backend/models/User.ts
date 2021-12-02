import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    avatar: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    ads: [{ type: Types.ObjectId, ref: 'Ad' }]
});

const User = model('User', schema);

export default User;
