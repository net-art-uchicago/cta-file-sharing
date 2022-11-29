const name = document.querySelector('#name')
const poem = document.querySelector('#poem')
const time = document.querySelector('#time')

const url = 'database.json'
const req = { method: 'GET' }
fetch(url, req)
  // turn json information into js object
  .then(res => res.text())
  // get data from poem database and print java script object "time"
  .then(data => {
    const obj = JSON.parse(data)
    // call author of poem... right now it is calling to the arbirtray package it successfully displays
    name.textContent = obj.author // change name to poem author
    poem.textContent = obj.poem // change description to poem
    time.textContent = obj.date // change to time
    console.log(data)
    console.log(date)
  })

async function getTime () {
  const res = await fetch('')
}