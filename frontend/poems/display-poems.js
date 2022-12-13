getPoems()

function addBubble (html, side) {
  const p = document.createElement('p')
  p.classList.add(side)
  p.innerHTML = html
  document.querySelector('.chatList').appendChild(p)
  setTimeout(() => {
    p.style.opacity = 1
  }, 100)
}

function getPoems () {
  const req = { method: 'GET' }
  fetch('/api/poems', req)
    .then(res => res.json())
    .then(data => displayData(data.poemList))
    .catch(err => console.log('error: ' + err))
}

function displayLinks () {
  const div = '<a href="/frontend/map.html"> click here to access the map </a>'
  addBubble(div, 'bubble2')
}

function displayData (data) {
  let i = 0
  function myLoop () {
    const rand = Math.floor(Math.random() * data.length)
    const mapslink = `<a href="https://www.google.com/maps/?q=${data[rand].location}" target="_blank">location</a>`
    const datetime = `${new Date(data[rand].datetime).toLocaleString()}`

    const text = `<b>${data[rand].text}</b> 
      <br><br> ...signed <b>${data[rand].author}</b> 
      <br><br> ✩ where: ${mapslink}
      <br> ✩ when: ${datetime}
      <br> ✩ route ${data[rand].route}`

    setTimeout(function () {
      addBubble(text, 'bubble')
      i++
      if (i < 3) {
        myLoop()
      } else {
        displayLinks()
      }
    }, 3000)
  }
  myLoop()
}
