import mongoose from 'mongoose';
export const launchesSchema = new mongoose.Schema({
    flightNumber: { type: Number, required: true, default: 100, min: 100, max: 900 },
    launchDate: { type: Date, required: true },
    mission: { type: String, required: true },
    rocket: { type: String, required: true },
    target: {
        type: String,
        required: true,
        // type: mongoose.isValidObjectId,
        // ref: 'Planet',
    },
    customers: {
        type: [String],
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: false,
    },
});
export const launches = mongoose.model('Launch', launchesSchema);
