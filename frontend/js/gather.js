const author = document.querySelector('#author')
const poem = document.querySelector('#poem')
const time = document.querySelector('#time')

const url = 'poems/poems.json'
const req = { method: 'GET' }
fetch(url, req)
  // turn json information into js object
  .then(res => res.text())
  // get data from poem database and print java script object "time"
  .then(data => {
    const obj = JSON.parse(data)
    // call poem poems.json file to access poems
    // now just displaying poems
    author.textContent = obj.author
    poem.textContent = obj.text
    time.textContent = obj.datetime // change to time
    console.log(data)
  })

// click through animation, on click cycle through pages with poems
