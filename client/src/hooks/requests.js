const baseUrl = 'http://localhost:5004'

// Load planets and return as JSON.
async function httpGetPlanets() {
  const res = await fetch(`${baseUrl}/planets`)
  return await res.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const res = await fetch(`${baseUrl}/launches`)
  const fetchedLaunches = await res.json()
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber)
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${baseUrl}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    })
  } catch (error) {
    return {
      ok: false,
    }
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${baseUrl}/launches/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch }
