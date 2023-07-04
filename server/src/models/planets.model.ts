import fs from 'fs'
import { parse } from 'csv-parse'
import path from 'path'
import { fileURLToPath } from 'url'
import { planets } from './planets.mongo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Planet {
  kepler_name: string
  koi_disposition: string
  koi_insol: number
  koi_prad: number
}

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
      .on('data', async (data: Planet) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data)
        }
      })
      .on('error', (err: Error) => {
        console.error(err)
        reject(err)
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found`)
        resolve(true)
      })
  })
}

export async function getAllPlanets() {
  return await planets.find({})
}

async function savePlanet(planet: Planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      },
    )
  } catch (err) {
    console.error(`Could not save planet ${err}`)
  }
}

export default {
  loadPlanetsData,
}
