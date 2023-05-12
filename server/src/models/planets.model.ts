import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Planet {
  kepler_name: string
  koi_disposition: string
  koi_insol: number
  koi_prad: number
}

const habitablePlanets: Planet[] = []

function isHabitablePlanet(planet: Planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
      .pipe(
        parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', (data: Planet) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data)
        }
      })
      .on('error', (err: Error) => {
        console.error(err)
        reject(err)
      })
      .on('end', () => {
        resolve(habitablePlanets)
      })
  })
}

export default {
  loadPlanetsData,
  planets: habitablePlanets,
}
