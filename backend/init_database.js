const fs = require('fs')
const path = require('path')

// a global variable w/the absolute path to the data base
const dbpath = path.join(__dirname, './database.json')
// checks to see if the database exists, if not it creates it
if (!fs.existsSync(dbpath)) {
  fs.writeFileSync(dbpath, '[]')
  console.log('New file created')
}

function validPoem (poem) {
  if (typeof poem.poem !== 'string') {
    return 'error: the poem should be a string'
  } else if (typeof poem.lat !== 'number' || typeof poem.lat !== 'number') {
    return 'error: latitute and longitude should be numbers'
  } else if (typeof poem.author !== 'string') {
    return 'error: author should be a string'
  } else if (typeof poem.route !== 'number') {
    return 'error: route should be a number'
  } else if (typeof poem.date !== 'number') {
    return 'error: date should be number'
  } else {
    return 'success'
  }
}

function addPoem (poem) {
  const db = require(dbpath)
  const msg = validPoem(poem)
  if (msg === 'success') {
    db.push(poem)
    fs.writeFileSync(dbpath, JSON.stringify(db, null, 2))
    return { message: msg }
  } else {
    return { message: 'error', error: msg }
  }
}

function allPoems () {
  const db = require(dbpath)
  return db
}

function findPoemsByLoc (lat, long, radius) {
  const db = require(dbpath)
  const poems = []
  for (let i = 0; i < db.length; i++) {
    if (Math.pow(lat - db[i].lat, 2) + Math.pow(long - db[i].long, 2) <= radius ** 2) {
      poems.push(db[i])
    }
  }
  return poems
}

function findPoemsByAuthor (author) {
  const db = require(dbpath)
  const poems = []
  for (let i = 0; i < db.length; i++) {
    if (db[i].author === author) {
      poems.push(db[i])
    }
  }
  return poems
}

function findPoemsByDate (date) {
  const db = require(dbpath)
  const poems = []
  for (let i = 0; i < db.length; i++) {
    if (db[i].date === date) {
      poems.push(db[i])
    }
  }
  return poems
}

function findPoemsByRoute (route) {
  const db = require(dbpath)
  const poems = []
  for (let i = 0; i < db.length; i++) {
    if (db[i].route === route) {
      poems.push(db[i])
    }
  }
  return poems
}

module.exports = {
  addPoem,
  validPoem,
  allPoems,
  findPoemsByLoc,
  findPoemsByAuthor,
  findPoemsByDate,
  findPoemsByRoute
}
