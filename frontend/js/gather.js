const name = document.querySelector('#name')
const poem = document.querySelector('#poem')
const time = document.querySelector('#time')

const url = 'package.json'
const req = { method: 'GET' }
fetch(url, req)
  // turn json information into js object
  .then(res => res.text())
  // get data from poem database and print java script object "time"
  .then(data => {
    const obj = JSON.parse(data)
    // call author of poem... right now it is calling to the arbirtray package it successfully displays
    name.textContent = obj.name // change name to poem author
    poem.textContent = obj.description // change description to poem
    time.textContent = obj.name // change to time
    console.log(data)
  })