const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explore IS1',
    launchDate: new Date('2030/12/27'),
    destination: '',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
function getAllLaunches() {
    return Array.from(launches.values());
}
function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, { customers: ['Hello'], success: true, upcoming: true, flightNumber: latestFlightNumber }));
}
export { getAllLaunches, addNewLaunch };
