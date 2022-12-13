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
  showPoem()
}
// update html page
function showPoem () {
  // poem is variable as div element, p is the data passing
  const poem = document.querySelector('#poem')
  const p = leap[i]
  poem.textContent = p.text
  i++
  // how many items in the array??
  if (i >= leap.length) {
    // display oldest poem ... later change to user poem
    i = 0
  }
}

// click through animation, on click cycle through pages with poems
// function for mouseclick
document.body.addEventListener('click', showPoem)
