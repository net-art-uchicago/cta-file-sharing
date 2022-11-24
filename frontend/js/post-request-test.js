postTest()

function postTest () {
  const testData = {
    datetime: 1668544391012, // number, unicode timestamp
    location: [41.78868316205326, -87.59874232864101], // Array of GPS coordinates
    text: 'an example poem', // string
    author: 'Bobby Bob', // string,
    route: 172 // number, a bus route
  }

  const url = 'api/add-poem'
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  }

  fetch(url, req).then(res => res.json()).then(testData => { console.log(testData) })
}
