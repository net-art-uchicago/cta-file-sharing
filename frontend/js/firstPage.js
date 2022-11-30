/* global prompts */

let crd, chosenRoute, author, poem

// --------------------- get GPS ---------------------

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success (pos) {
  crd = pos.coords
  startConvo()
}

function error (err) {
  if (err && err.message) window.alert(err.message)
  addBubble(prompts.noGPS, 'bubble')
  startConvo()
}

navigator.geolocation.getCurrentPosition(success, error, options)

// --------------------- bubble convo functions ---------------------

function addBubble (html, side) {
  const p = document.createElement('p')
  p.classList.add(side)
  p.innerHTML = html
  document.querySelector('.chatList').appendChild(p)
  setTimeout(() => {
    p.style.opacity = 1
  }, 100)
}

function startConvo () {
  setTimeout(() => addBubble(prompts.intro, 'bubble'), 500)
  setTimeout(() => {
    addBubble(prompts.routeQ, 'bubble')
    getRoutes()
  }, 1500)
}

function poemEntered (e) {
  const textField = document.querySelector('#textid')
  poem = textField.value
  addBubble(poem, 'bubble2')
  textField.value = ''
  addBubble(prompts.getAuthor, 'bubble')
  document.querySelector('#textSubmit').onclick = (e) => authorEntered(e)
}

function authorEntered (e) {
  const textField = document.querySelector('#textid')
  author = textField.value
  addBubble(author, 'bubble2')
  textField.value = ''
  postPoem({
    datetime: Date.now(), // number, unicode timestamp
    location: [crd.latitude, crd.longitude], // Array of GPS coordinates
    text: poem, // string
    author: author, // string,
    route: chosenRoute // number, a bus route
  })
}

// --------------------- fetch functions ---------------------

async function getRoutes () {
  // NOTE: for local mobile testing
  // crd = {
  //   latitude: 41.78889190252645,
  //   longitude: -87.59912079718956
  // }

  const res = await window.fetch(`api/stops?userLat=${crd.latitude}&userLon=${crd.longitude}`)
  const data = await res.json()
  const select = document.getElementById('selectInputId')
  select.addEventListener('change', (e) => {
    const route = e.target.value
    if (route === 'pick') return
    getClosestDistance(route)
  })

  for (let i = 0; i < data.routes.length; i++) {
    const option = document.createElement('option')
    option.value = data.routes[i]
    option.innerText = data.routes[i]
    select.appendChild(option)
  }
}

async function getClosestDistance (r) {
  const res = await window.fetch(`api/cta-bus-distance?route=${r}&userLat=${crd.latitude}&userLon=${crd.longitude}`)
  const data = await res.json()
  if (chosenRoute) return // ensure this only runs once
  chosenRoute = r
  // TODO: we could maybe give them different prompts depending on
  // how far the bus is, ie. data.distance
  addBubble(prompts.askPoem, 'bubble')
  document.querySelector('#textid').style.display = 'block'
  document.querySelector('#textSubmit').style.display = 'block'
  document.querySelector('#textSubmit').onclick = (e) => poemEntered(e)
}

async function postPoem (poemObj) {
  const data = {
    method: 'POST',
    headers: {
      Accept: 'applications/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(poemObj)
  }

  const res = await window.fetch('api/add-poem', data)
  const json = await res.json()

  if (json.message === 'success') {
    window.location = '/page2'
  } else {
    // TODO: fallback message if something went wrong?
  }
}
