const fs = require('fs')
const axios = require('axios')
const path = require('path')

const main = async () => {
  const res = await axios('https://data.cityofchicago.org/api/views/qs84-j7wh/rows.json?accessType=DOWNLOAD')
<<<<<<< HEAD
  // res was returned as a nested array
  const stops = res.data.data.map((stop) => {
    // stops gets through nested array to just have an array of arrays, each array has
    // 2 objects: a coordinate (lat and lon), and bus route numbers associated with
    // stop location
    const loc = stop[8].slice(7, -1).split(' ').map((point) => parseFloat(point))
    // loc just making coordinates a float, not a string
    const routes = (stop[14] === null) ? [] : stop[14].split(',')
    // line 14 counts for if there are no routes associated with a stop, makes it
    // empty array
=======
  //res was returned as a nested array
  const stops = res.data.data.map((stop) => {
    //stops gets through nested array to just have an array of arrays, each array has 
    //2 objects: a coordinate (lat and lon), and bus route numbers associated with
    //stop location
    const loc = stop[8].slice(7, -1).split(' ').map((point) => parseFloat(point))
    //loc just making coordinates a float, not a string
    const routes = (stop[14] === null) ? [] : stop[14].split(',')
    //line 14 counts for if there are no routes associated with a stop, makes it 
    //empty array
>>>>>>> 80260dc7b8685110748c50d52efee027eca38ed2
    return { loc, routes }
  })

  const data = JSON.stringify(stops, null, 2)
  // write the data to the file system, into a file called "bus-data.json"
  const filepath = path.join(__dirname, '../backend/bus-data.json')
  fs.writeFileSync(filepath, data)
}

main()
