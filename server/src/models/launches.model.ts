const launches = new Map()

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration',
  rocket: 'Explore IS1',
  launchDAte: new Date('2030/12/27'),
  destination: '',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

export { launches }
