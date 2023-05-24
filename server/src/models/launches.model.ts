type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customers: string[]
  upcoming: boolean
  success: boolean
}

const launches = new Map()

let latestFlightNumber = 100

const launch: Launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration',
  rocket: 'Explore IS1',
  launchDate: new Date('2030/12/27'),
  destination: '',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
  return Array.from(launches.values())
}

function addNewLaunch(launch: Launch) {
  latestFlightNumber++
  launches.set(
    latestFlightNumber,
    Object.assign(launch, { customers: ['Hello'], success: true, upcoming: true, flightNumber: latestFlightNumber }),
  )
}

export { getAllLaunches, addNewLaunch }
