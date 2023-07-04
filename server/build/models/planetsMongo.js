import mongoose from 'mongoose';
export const planentsSchema = new mongoose.Schema({
    keplerName: { tyep: String, required: true },
    koi_disposition: { type: String, required: true },
    koi_insol: { type: Number, required: true },
    koi_prad: { type: Number, required: true },
});
export const planets = mongoose.model('Planent', planentsSchema);
