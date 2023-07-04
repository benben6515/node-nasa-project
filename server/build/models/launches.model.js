// import launches from './launches.mongo'
const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explore IS1',
    launchDate: new Date('2030/12/27'),
    target: '',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
export function getAllLaunches() {
    return Array.from(launches.values());
}
export function existsLaunchWithId(launchId) {
    return launches.has(+launchId);
}
export function abortLaunchById(launchId) {
    const aborted = launches.get(+launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
export function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, { customers: ['Hello'], success: true, upcoming: true, flightNumber: latestFlightNumber }));
}
