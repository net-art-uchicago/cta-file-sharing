postTest()

function postTest () {
  const testData = {
    poem: 'a',
    date: 1,
    author: 'a',
    lat: 1,
    long: 1,
    route: 1
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
