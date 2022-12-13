getPoems()
let all
startGather()

function addBubble (html, side) {
  const p = document.createElement('p')
  p.classList.add(side)
  p.innerHTML = html
  document.querySelector('.chatList').appendChild(p)
  setTimeout(() => {
    p.style.opacity = 1
  }, 100)
}

function startGather () {
  setTimeout(() => addBubble(prompts.whoIs, 'bubble'), 500)
}

async function getPoems () {
  const req = await fetch('/api/poems')
  const data = await req.json()
    .catch(err => console.log('error: ' + err))
  const present = Date.now()
  all = data.poemList.filter(p => p.datetime < present)
  appendData()
}
// update html page
function appendData () {
  const mainCont = document.querySelector('#poem')
  for (let i = 0; i < all.length; i++) {
    const div = document.createElement('div')
    div.innerHTML = `${all[i].text} ...signed ${all[i].author} --
                        ${all[i].location} -- ${all[i].datetime}
                        -- ROUTE ${all[i].route}`
    mainCont.appendChild(div)
  }
}
