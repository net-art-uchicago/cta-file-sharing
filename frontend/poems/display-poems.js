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
  fetch('poems.json', req)
    .then(res => res.json())
    .then(data => appendData(data))
    .catch(err => console.log('error: ' + err))
}

function appendData (data) {
  const mainCont = document.querySelector('#poem')
  for (let i = 0; i < all.length; i++) {
    const div = document.createElement('div')
    div.innerHTML = `${data[i].text} ...signed ${data[i].author} --
                        ${data[i].location} -- ${data[i].datetime}
                        -- ROUTE ${all[i].route}`
    mainCont.appendChild(div)
  }
}
