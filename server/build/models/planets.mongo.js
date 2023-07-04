import mongoose from 'mongoose';
export const planentsSchema = new mongoose.Schema({
    keplerName: { tyep: String },
    koi_disposition: { type: String },
    koi_insol: { type: Number },
    koi_prad: { type: Number },
});
export const planets = mongoose.model('Planent', planentsSchema);
