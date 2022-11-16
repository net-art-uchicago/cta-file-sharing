const express = require('express')
const router = express.Router()
const axios = require('axios')
const { response } = require('express')

function distance(lat1,lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180
    lon2 = lon2 * Math.PI / 180
    lat1 = lat1 * Math.PI / 180
    lat2 = lat2 * Math.PI / 180

    // Haversine formula
    let dlon = lon2 - lon1
    let dlat = lat2 - lat1
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2)

    let c = 2 * Math.asin(Math.sqrt(a))

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371

    // calculate the result
    return(c * r)
}

//API/CTA-BUS-DISTANCE
router.get('/api/cta-bus-distance', async (req, res) => {
    const route = 172
    const bus = await axios.get(`https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
    //res.json(bus.data)
    lst_bus = bus.data['bustime-response']['vehicle']
    lst_bus_lat_lon = []
    for (let i =0; i < lst_bus.length; i++) {
        lat = bus.data['bustime-response']['vehicle'][i]['lat']
        lon = bus.data['bustime-response']['vehicle'][i]['lon']
        lst_bus_lat_lon.push([lat,lon])
    }
    //User's current lat and lon
    user_lat = 41.78650608062744
    user_lon = -87.59143829345703
    lst_distance = []
    for (let i = 0; i < lst_bus_lat_lon.length; i++) {
        lst_distance.push(distance(lst_bus_lat_lon[i][0],user_lat, lst_bus_lat_lon[i][1], user_lon))
    }
    obj_min_distance = Math.min(...lst_distance)
    res.json({
        distance: obj_min_distance})
})

//router.get('/api/cta-near-stop', async (req, res) => {
//    const route = 172
//    const bus = await axios.get(`https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
//    
//    console.log(Math.min(...lst_distance))
//})



//Check database --> fetch from CTA
module.exports = router
