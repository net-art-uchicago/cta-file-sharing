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
    return (c * r)
}

//API/CTA-BUS-DISTANCE
//Returns JSON of closest distance from closest bus on route to user's location
router.get('/api/cta-bus-distance', async (req, res) => {
    //From user input (front-end)
    const route = 172
    const bus = await axios.get(`https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
    lst_bus = bus.data['bustime-response']['vehicle']
    lst_bus_lat_lon = []
    for (let i = 0; i < lst_bus.length; i++) {
        lat = bus.data['bustime-response']['vehicle'][i]['lat']
        lon = bus.data['bustime-response']['vehicle'][i]['lon']
        lst_bus_lat_lon.push([lat,lon])
    }
    //User's current lat and lon (replace with actual lat and lon)
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

router.get('/api/cta-routes', async (req, res) => {
    const routes = await axios.get(`https://www.ctabustracker.com/bustime/api/v2/getroutes?key=gbNab8LFcBWDx5qmtc8Q8dfjb&format=json`)
    lst_route = routes.data['bustime-response']['routes']
    lst_routes = []
    for (let i = 0; i < lst_route.length; i++) {
        lst_routes.push(routes.data['bustime-response']['routes'][i]['rt'])
    }    
    res.json({
        lst_routes})
})

//Returns JSON of distance to closest stop
router.get('/api/cta-near-stop', async (req, res) => {
    //Change route to user's input
    const route = 172
    const directions = await axios.get(`https://ctabustracker.com/bustime/api/v3/getdirections?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&format=json`)
    lst_direction = directions.data['bustime-response']['directions']
    lst_directions = []
    for (let i = 0; i < lst_direction.length; i++) {
        lst_directions.push(directions.data['bustime-response']['directions'][i]['id'])
    }
    lst_stops = []
    const first_way_stops = await axios.get(`http://ctabustracker.com/bustime/api/v2/getstops?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&dir=${lst_directions[0]}&format=json`)
    for (let j = 0; j < lst_direction.length; j++) {
        lst_stops_temp = []
        lst_stops_temp.push(first_way_stops.data['bustime-response']['stops'][j]['stpnm'])
        lst_stops_temp.push(first_way_stops.data['bustime-response']['stops'][j]['lat'])
        lst_stops_temp.push(first_way_stops.data['bustime-response']['stops'][j]['lon'])
        lst_stops.push(lst_stops_temp)
    }
    if (lst_direction.length == 2) {
        const second_way_stops = await axios.get(`http://ctabustracker.com/bustime/api/v2/getstops?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=${route}&dir=${lst_directions[1]}&format=json`)
        for (let j = 0; j < lst_direction.length; j++) {
            lst_stops_temp = []
            lst_stops_temp.push(second_way_stops.data['bustime-response']['stops'][j]['stpnm'])
            lst_stops_temp.push(second_way_stops.data['bustime-response']['stops'][j]['lat'])
            lst_stops_temp.push(second_way_stops.data['bustime-response']['stops'][j]['lon'])
            lst_stops.push(lst_stops_temp)
        }
    }
    user_lat = 41.78650608062744
    user_lon = -87.59143829345703
    lst_distance = []
    for (let i = 0; i < lst_stops.length; i++) {
        lst_distance.push(distance(lst_stops[i][1],user_lat, lst_stops[i][2], user_lon))
    }
    obj_min_distance = Math.min(...lst_distance)
    res.json({
        distance: obj_min_distance})
})

//Check database --> fetch from CTA
module.exports = router
