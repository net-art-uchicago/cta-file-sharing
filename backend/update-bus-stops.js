const fs = require('fs')
const path = require('path')

// this is example data to test the script,
// u're gonna want to replace this with data
// from the CTA API

//getting a list of routes first, helps us establish what routes exist 
const lst_routes = async () => {
    const routes = []
    const routes_data = await fetch('https://ctabustracker.com/bustime/api/v3/getroutes?key=x7L9d2WQ6qvyvBeSkKtAjDmFH&format=json')
        .then(res => res.json());
        for (let i = 0; i < routes_data.length; i++) {
            lst_routes.push(routes_data['bustime-response']['routes'][i]['rt'])
        }
    //not sure if the syntax here to access nested dict is [] or ., ask 


// constructing stop coordinates. need help with testing the code to make sure it's right, will ask prof
const stops_coordinates = async() => {
    const stops = {}
    const directions = ['North', 'South', 'East', 'West']
    for (let route = 0; route < lst_routes.length; route++) {
        for (let dir = 0; dir < directions.length; dir++) {
            const coordinate = await fetch ('https://ctabustracker.com/bustime/api/v3/getstops?key=x7L9d2WQ6qvyvBeSkKtAjDmFH&rt=${route}&dir=${dir}format=json')
            if (coordinate) {
                stops[route] = (coordinate['lat'], coordinate['lon'])
            } else {
                pass
            }
        }
    }
}
// convert the object/array into a JSON string
const data = JSON.stringify(stops, null, 2)
// write the data to the file system, into a file called "bus-data.json"
const filepath = path.join(__dirname, '../backend/bus-data.json')
fs.writeFileSync(filepath, data)
}
