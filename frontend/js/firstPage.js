const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success (pos) {
  const crd = pos.coords
  console.log('Your current position is:')
  console.log(`Latitude : ${crd.latitude}`)
  console.log(`Longitude: ${crd.longitude}`)
  console.log(`More or less ${crd.accuracy} meters.`)
}

function error (err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

let currentLocation = navigator.geolocation.getCurrentPosition(success, error, options)

// const testLocation = [41.234324, 23.23423423]

async function getRoutes () {
  const res = await fetch('api/stops?userLat=&userLon=')
  const data = await res.json()
  const x = document.getElementById('selectInputId')
  for (let i = 0; i < data.length; i++) {
    const option = document.createElement('option')
    option.text = data[i].routes
    x.addEventListener(option)
  }
}

// display routes in drop down, what does this get return?

// async function nearStop () {
//  const res = await fetch('api/cta-near-stop?route=55&userLat=&userLon=')
//  const data = await res.json()
// }

// nearby stops should give empty list if not near
// what does structure of stop look like?

// const stop = '55th and Ellis'

// const route = 55

async function getClosestDistance () {
  const res = await fetch('api/cta-bus-distance?route=&userLat=&userLon=')
  const data = await res.json()
  // in km
  let time = data / 16 / 60
}
// given certain bus's distance, do I have to calculate average time?

// let poem = [
// {
// datetime: 1668544391012, // number, unicode timestamp
// location: [41.78868316205326, -87.59874232864101], // Array of GPS coordinates
// text: 'an example poem', // string
// author: 'Bobby Bob', // string,
// route: 172 // number, a bus route
// }
// ]
// prompt for author name?
// box to type in

async function postPoem (poem) {
  const data = {
    method: 'POST',
    headers: {
      Accept: 'applications/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(poem)
  }

  const res = await fetch('api/add-poem')

  const json = await res.json()

  console.log(data)
}
