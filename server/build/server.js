import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import planetsModel from './models/planets.model.js';
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
async function main() {
    if (!MONGO_URL)
        throw new Error('No mongo url!');
    console.log(MONGO_URL);
    const options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };
    mongoose.connection
        .once('open', () => console.log('MongoDB connection ready'))
        .on('error', () => {
        console.log('error', (err) => {
            console.error(err);
        });
    });
    await mongoose.connect(MONGO_URL, {});
    const server = http.createServer(app);
    await planetsModel.loadPlanetsData();
    server.listen(PORT, async () => {
        console.log(`server listen at ${PORT}`);
    });
}
main();
