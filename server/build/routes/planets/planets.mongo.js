import mongoose from 'mongoose';
export const PlanetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        require: true,
    },
    // koiDisposition: {
    //   type: String,
    //   require: true,
    // },
    // koiInsol: {
    //   type: Number,
    //   require: true,
    // },
    // koiPrad: {
    //   type: Number,
    //   require: true,
    //},
});
