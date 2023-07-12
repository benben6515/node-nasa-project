import { launches as launchesDatabase } from './launches.mongo.js'
import { planets } from './planets.mongo.js'
import type { UpdateWriteOpResult } from 'mongoose'

type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  target: string
  customers: string[]
  upcoming: boolean
  success: boolean
}

const launches = new Map()

const DEFAULT_FLIGHT_NUMBER = 100

const launch: Launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration',
  rocket: 'Explore IS1',
  launchDate: new Date('2030/12/27'),
  target: '',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

export async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    },
  )
  // return Array.from(launches.values())
}

export async function existsLaunchWithId(launchId: number | string) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  })
}

export async function abortLaunchById(launchId: number | string) {
  const aborted = await launchesDatabase.updateOne(
    {
      filghtNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    },
  )
  return aborted.modifiedCount === 1
}

export async function saveLaunch(launch: Launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  })

  if (!planet) {
    throw new Error('No matching planet found!')
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    },
  )
}

export async function scheduleNewLaunch(launch: Launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    costomer: ['Zero to Mastery', 'NASA'],
    filghtNumber: newFlightNumber,
  })
  await saveLaunch(newLaunch)
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber')

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER

  return latestLaunch?.flightNumber
}
