const fs = require('fs')
const axios = require('axios')
const path = require('path')

const main = async () => {
  const res = await axios('https://data.cityofchicago.org/api/views/qs84-j7wh/rows.json?accessType=DOWNLOAD')
  const stops = res.data.data.map((stop) => {
    const loc = stop[8].slice(7, -1).split(' ').map((point) => parseFloat(point))
    const routes = (stop[14] === null) ? [] : stop[14].split(',')
    return { loc, routes }
  })

  const data = JSON.stringify(stops, null, 2)
  // write the data to the file system, into a file called "bus-data.json"
  const filepath = path.join(__dirname, '../backend/bus-data.json')
  fs.writeFileSync(filepath, data)
}

main()
