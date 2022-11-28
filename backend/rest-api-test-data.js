/* global app */
const testData = [
    {
    poem: 'abc',
    time: 1,
    author: 'nick',
    lat: 3,
    long: 4,
    route: 123
    },
    {
    poem: 'abc2',
    time: 1,
    author: 'nick',
    lat: 3,
    long: 4,
    route: 123
    },
    {
    poem: 'abc3',
    time: 2,
    author: 'nick',
    lat: 4,
    long: 4,
    route: 124
    }, 
    {
    poem: 'abc4',
    time: 1,
    author: 'tina',
    lat: 4,
    long: 4,
    route: 124
    }, 
    {
    poem: 'abc5',
    time: 1,
    author: 'tina',
    lat: 3,
    long: 5,
    route: 123
    }
  ]
  
  function allPoems(){
    return testData
  }
  
  module.exports = {
    allPoems,
  }