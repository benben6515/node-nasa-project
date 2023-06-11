import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const habitablePlanets = [];
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
            comment: '#',
            columns: true,
        }))
            .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
            .on('error', (err) => {
            console.error(err);
            reject(err);
        })
            .on('end', () => {
            resolve(habitablePlanets);
        });
    });
}
export function getAllPlanets() {
    return habitablePlanets;
}
export default {
    loadPlanetsData,
};
