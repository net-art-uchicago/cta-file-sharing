const { debug } = require("console");
const fs = require("fs");

function addPoem (poem) {
    const db = require('./database.json')
    const newPoem = poem
    db.push(newPoem)
    fs.writeFile('database.json', JSON.stringify(db), err => {
        if (err) throw err
        console.log('Done writing') // Success
    })
}
addPoem({'poem': 'this is a poem', 'date': 11242022, 'author': 'trisha','lat': 3, 'long': 4, 'route': 12 })

function findPoemsByLoc (lat, long, radius) {
    const db = require('./database.json')
    const poems = []
    for (let i = 0; i < db.length; i++) {
        if (Math.pow(lat - db[i].lat,2) + Math.pow(long - db[i].long,2) <= radius**2) {
            poems.push(db[i])
        }
    }
    return poems
}

function findPoemsByAuthor (author) {
    const db = require('./database.json')
    const poems = []
    for (let i = 0; i < db.length; i++) {
        if (db[i].author === author) {
            poems.push(db[i])
        }
    }
    return poems
}

function findPoemsByroute (date) {
    const db = require('./database.json')
    const poems = []
    for (let i = 0; i < db.length; i++) {
        if (db[i].date === date) {
            poems.push(db[i])
        }
    }
    return poems
}

function findPoemsByRoute (route) {
    const db = require('./database.json')
    const poems = []
    for (let i = 0; i < db.length; i++) {
        if (db[i].route === route) {
            poems.push(db[i])
        }
    }
    return poems
}

