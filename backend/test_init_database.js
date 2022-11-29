// this is a mock file for us to test the database functions

const {
    addPoem,
    findPoemsByLoc,
    findPoemsByAuthor,
    findPoemsByDate,
    findPoemsByRoute
  } = require('./init_database.js')
  
  const ex1 = {
    poem: 'the grasshopper and the ant',
    date: 123455, 
    author: 'aesop',
    lat: 41.791922677426506,
    long: -87.60271561387228,
    route: 10
  }

  const ex2 = {
    poem: 'hello',
    date: 145999, 
    author: 'poe',
    lat: 41.881832,
    long: 	-87.623177,
    route: 75
  }


  const ex3 = {
    poem: 'goodbye',
    date: 145999, 
    author: 'trisha',
    lat: 41.881832,
    long: 	-87.623177,
    route: 75
  }

  const ex4 = {
    poem: 'goodbye',
    date: 145999, 
    author: 'trisha',
    lat: 41.881832,
    long: 	-87.623177,
    route: 75
  }

  

  addPoem(ex1)
  addPoem(ex2)
  addPoem(ex3)
  addPoem(ex4)

  const a = findPoemsByAuthor('aesop')
  console.log('testing findPoemsByAuthor', a)
  
  const b = findPoemsByRoute(10)
  console.log('testing findPoemsByRoute', b)
  
  const c = findPoemsByDate(12345)
  console.log('testing findPoemsByDate', c)
  
  const d = findPoemsByLoc(41.87876819051024, -87.62697145767098, 1)
  console.log('testing findPoemsByLoc', d)
  