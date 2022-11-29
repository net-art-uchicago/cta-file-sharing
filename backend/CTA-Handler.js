const express = require('express')
const router = express.Router()
const axios = require('axios')

function distance (lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = lon1 * Math.PI / 180
  lon2 = lon2 * Math.PI / 180
  lat1 = lat1 * Math.PI / 180
  lat2 = lat2 * Math.PI / 180
  // Haversine formula
  const dlon = lon2 - lon1
  const dlat = lat2 - lat1
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)
  const c = 2 * Math.asin(Math.sqrt(a))
  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371
  // calculate the result
  return (c * r)
}

// API/CTA-BUS-DISTANCE
// Returns JSON of closest distance from closest bus on route to user's location
router.get('/api/cta-bus-distance', async (req, res) => {
  // From user input (front-end)
  const route = 172
  const bus = await axios.get(`https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
  const lstBus = bus.data['bustime-response'].vehicle
  const lstBusLatLon = []
  for (let i = 0; i < lstBus.length; i++) {
    const lat = bus.data['bustime-response'].vehicle[i].lat
    const lon = bus.data['bustime-response'].vehicle[i].lon
    lstBusLatLon.push([lat, lon])
  }
  // User's current lat and lon (replace with actual lat and lon)
  const userLat = 41.78650608062744
  const userLon = -87.59143829345703
  const lstDistance = []
  for (let i = 0; i < lstBusLatLon.length; i++) {
    lstDistance.push(distance(lstBusLatLon[i][0], userLat, lstBusLatLon[i][1], userLon))
  }
  const objMinDistance = Math.min(...lstDistance)
  res.json({ distance: objMinDistance })
})

router.get('/api/cta-routes', async (req, res) => {
  const routes = await axios.get('https://www.ctabustracker.com/bustime/api/v2/getroutes?key=gbNab8LFcBWDx5qmtc8Q8dfjb&format=json')
  const lstRoute = routes.data['bustime-response'].routes
  const lstRoutes = []
  for (let i = 0; i < lstRoute.length; i++) {
    lstRoutes.push(routes.data['bustime-response'].routes[i].rt)
  }
  res.json({ lstRoutes })
})

// Returns JSON of distance to closest stop
router.get('/api/cta-near-stop', async (req, res) => {
  // Change route to user's input
  const route = 172
  const directions = await axios.get(`https://ctabustracker.com/bustime/api/v3/getdirections?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
  const lstDirection = directions.data['bustime-response'].directions
  const lstDirections = []
  for (let i = 0; i < lstDirection.length; i++) {
    lstDirections.push(directions.data['bustime-response'].directions[i].id)
  }
  const lstStops = []
  const firstWayStops = await axios.get(`http://ctabustracker.com/bustime/api/v2/getstops?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&dir=${lstDirections[0]}&format=json`)
  for (let j = 0; j < lstDirection.length; j++) {
    const lstStopsTemp = []
    lstStopsTemp.push(firstWayStops.data['bustime-response'].stops[j].stpnm)
    lstStopsTemp.push(firstWayStops.data['bustime-response'].stops[j].lat)
    lstStopsTemp.push(firstWayStops.data['bustime-response'].stops[j].lon)
    lstStops.push(lstStopsTemp)
  }
  if (lstDirection.length === 2) {
    const secondWayStops = await axios.get(`http://ctabustracker.com/bustime/api/v2/getstops?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&dir=${lstDirections[1]}&format=json`)
    for (let j = 0; j < lstDirection.length; j++) {
      const lstStopsTemp = []
      lstStopsTemp.push(secondWayStops.data['bustime-response'].stops[j].stpnm)
      lstStopsTemp.push(secondWayStops.data['bustime-response'].stops[j].lat)
      lstStopsTemp.push(secondWayStops.data['bustime-response'].stops[j].lon)
      lstStops.push(lstStopsTemp)
    }
  }
  const userLat = 41.78650608062744
  const userLon = -87.59143829345703
  const lstDistance = []
  for (let i = 0; i < lstStops.length; i++) {
    lstDistance.push(distance(lstStops[i][1], userLat, lstStops[i][2], userLon))
  }
  const objMinDistance = Math.min(...lstDistance)
  res.json({ distance: objMinDistance })
})

// Check database --> fetch from CTA
module.exports = router
