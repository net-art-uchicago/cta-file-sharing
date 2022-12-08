const express = require('express')
const router = express.Router()

const { addPoem, allPoems } = require('./init_database.js')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.post('/api/add-poem', (req, res) => {
  const check = addPoem(req.body)
  res.json(check)
})

/*
*   Get Request:
*   Endpoint URL: /api/poems
*   Description: Get all poems
*   example:  "/api/poems?loc=121.121029,23.1029381208&radius=20&author=nick"
*   Notes: Here searchPoemByAuthor,searchPoemByLoc,searchPoemByRoute are implemented by the database team
*/

router.get('/api/poems', (req, res) => {
  const author = req.query.author
  let loc = req.query.loc
  if (loc) loc = loc.split(',')
  console.log(loc)
  const radius = req.query.radius
  const route = req.query.route

  const filter =
    {
      author,
      lat: loc ? parseInt(loc[0]) : null,
      long: loc ? parseInt(loc[1]) : null,
      radius: radius ? parseInt(radius) : 20,
      route: parseInt(route)
    }

  let msg = ''
  let poemList = []

  if (loc && loc.length !== 2) {
    msg = 'Invalid Location; expected 2 coordinates, got more'
    res.send({ poem: null, status: false, msg })
  }
  poemList = allPoems()
  console.log(filter)
  poemList = poemList.filter(function (item) {
    for (const key in filter) {
      if (key === 'lat' || key === 'long' || key === 'radius') {
        console.log(filter.lat, item.lat, filter.long, item.long, filter.radius)
        console.log('distance', getDistance(filter.lat, filter.long, item.lat, item.long))
        if (getDistance(filter.lat, filter.long, item.lat, item.long) > filter.radius) {
          return false
        }
      } else if (filter[key] && item[key] !== filter[key]) {
        return false
      }
    }
    return true
  })
  function getDistance (x1, y1, x2, y2) {
    const y = x2 - x1
    const x = y2 - y1

    return Math.sqrt(x * x + y * y)
  }

  res.send({
    poemList,
    length: poemList.length,
    status: true,
    msg: 'poems sent'
  })
})

router.post('/api/get-sentiment', (req, res) => {
  // Sentiment Analysis package (installed from npm)
  async function computeSentiment (text) {
    const Sentiment = require('sentiment')
    const sentiment = new Sentiment()
    const result = sentiment.analyze(text)
    return (result.comparative)
  }
// CODE BELOW IS FOR CONVERTING SENTIMENT DATA + POEMS INTO GEOJSON FOR HEATMAP
// Run Sentiment Analysis on the Poems and convert out poem JSON to a GEOJSON for Mapping
    // poemList = allPoems()
    // const outGeoJson = {}
    // const sentiment = []
    // const coords = []

    // for (const key in poemList) {
    //   const aPoem = poemList[key]
    //   aPoem.sentm = computeSentiment(aPoem.poem)
    //   sentiment.push(aPoem.sentm)
    //   coords.push([aPoem.lat, aPoem.long])
    // }

    // outGeoJson.type = 'Feature'
    // outGeoJson.properties = sentiment
    // outGeoJson.geometry = ({ type: 'Point', coordinates: coords })

    // res.send({
    //   outGeoJson,
    //   msg: 'sentiment geojson sent'
    // })
})

module.exports = router
