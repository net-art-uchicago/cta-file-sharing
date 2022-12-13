getPoems()
let leap
let i = 0

async function getPoems () {
  // poems from REST
  const req = await fetch('/api/poems')
  const data = await req.json()
  // filter poems wrt time
  // variable for 1o min in millisec
  const min = 1000 * 60 * 10
  // 10 minutes ago as a number
  const past = Date.now() - min
  leap = data.poemList.filter(p => p.datetime > past)
  // show oldest first to user's poem
  console.log(leap)
  showPoem()
}
// update html page
function showPoem () {
  // poem is variable as div element, p is the data passing
  const poem = document.querySelector('#poem')
  const author = document.querySelector('#author')
  const usage = document.querySelector('.usage')
  const p = leap[i]
  poem.textContent = p.text
  author.textContent = p.author
  usage.textContent = 'click anywhere to see the other poems'
  i++
  // how many items in the array??
  if (i > leap.length) {
    // display oldest poem ... later change to user poem
    i = 0
  }
  else if (i === leap.length) {
    usage.textContent = p.author
    console.log(i)
    i = 0
  }
  // what to do on the last click?
  // else () {
  // showExit()
  // }
}
// !!! find a way back to the map or writing another poem ,,,
// especially important if the bus is late and someone wants
// to write another poem maybe limit user to write a poem every
// 10 minutes
// function showExit () {
// }

// click through animation, on click cycle through pages with poems
// function for mouseclick
document.body.addEventListener('click', showPoem)
