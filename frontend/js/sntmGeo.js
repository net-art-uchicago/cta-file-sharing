// async function getAllPoems () {
//   const res = await fetch('/api/poems')
//   const data = await res.json()
//   data.forEach(poem => {
//     poem.author
//   });
// }

// Sentiment Analysis package (installed from npm)
async function getSentiment (text) {
  const Sentiment = require('sentiment')
  const sentiment = new Sentiment()
  const result = sentiment.analyze(text)
  return (result.comparative)
}

// Test Data of Poems
const testData = [
  {
    poem: 'a cat jumped over an evil demon',
    date: 1,
    author: 'nick',
    lat: -87.65005,
    long: 41.85003,
    route: 123
  },
  {
    poem: 'a dog licked a delicious lollipop',
    date: 1,
    author: 'tina',
    lat: -107.65005,
    long: 41.85003,
    route: 124
  }
]

// Run Sentiment Analysis on the Poems and convert out poem JSON to a GEOJSON for Mapping
async function getGeoJson() {
  const outGeoJson = {}
  const sentiment = []
  const coords = []

  for (const key in testData) {
    const aPoem = testData[key]
    aPoem.sentm = getSentiment(aPoem.poem)
    sentiment.push(aPoem.sentm)
    coords.push([aPoem.lat, aPoem.long])
  }

  outGeoJson.type = 'Feature'
  outGeoJson.properties = sentiment
  outGeoJson.geometry = ({ type: 'Point', coordinates: coords })

  return outGeoJson
}
