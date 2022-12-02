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
    console.log('error: the poem should be a string')
    return 0
  } else if (typeof poem.lat !== 'number' || typeof poem.lat !== 'number') {
    console.log('error: latitute and longitude should be numbers')
    return 0
  } else if (typeof poem.author !== 'string') {
    console.log('error: author should be a string')
    return 0
  } else if (typeof poem.route !== 'number') {
    console.log('error: route should be a number')
    return 0
  } else if (typeof poem.date !== 'number') {
    console.log('error: datetime should be number')
    return 0
  } else {
    console.log('success: valid entry')
    return 1
  }
}

function addPoem (poem) {
  const db = require(dbpath)
  if (validPoem(poem)) {
    db.push(poem)
    fs.writeFileSync(dbpath, JSON.stringify(db, null, 2), err => {
      if (err) throw err
      console.log('Done writing') // Success
    })
  }
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
  findPoemsByLoc,
  findPoemsByAuthor,
  findPoemsByDate,
  findPoemsByRoute
}
