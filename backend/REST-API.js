/* global app */

const express = require('express')
const router = express.Router()
const {
  searchPoemByAuthor,
  searchPoemByLoc,
  searchPoemByRoute,
  allPoems
} = require('./rest-api-test-data.js')

router.get('/api/example', (req, res) => {
  res.json({ status: 'success', message: 'this is an example' })
})


/* 
*   Get Request: 
*   Endpoint URL: /api/poems
*   Description: Get all poems
*   example:  "/api/poems?loc=121.121029,23.1029381208&radius=20&author=nick"
*   Notes: Here searchPoemByAuthor,searchPoemByLoc,searchPoemByRoute are implemented by the database team
*/


router.get('/api/poems', (req, res) => {
  const author = req.query.author
  let loc = req.query.loc 
  if (loc) loc = loc.split(',')
  console.log(loc)
  const radius = req.query.radius
  const route = req.query.route
  const success = false
  
  const filter = 
    {
      "author": author,
      "lat": loc ? parseInt(loc[0]) : null,
      "long": loc ? parseInt(loc[1]) : null,
      "radius": radius ? parseInt(radius) : 20,
      "route": route
    }
  

  let msg = ""
  let poem_list = []

  if (loc && loc.length !==2)
  {
      success = false
      msg = "Invalid Location; expected 2 coordinates, got more"
      res.send({"poem":null, "status" : true, "msg": msg})
  }
  {
    poem_list = allPoems()
    console.log(filter)
    poem_list= poem_list.filter(function(item) {
      for (var key in filter) {
        if (key == "lat" || key == "long" || key == "radius"){
          console.log(filter["lat"],item["lat"],filter["long"],item["long"],filter["radius"])
          console.log("distance" ,getDistance(filter["lat"],filter["long"],item["lat"],item["long"]))
          if (getDistance(filter["lat"],filter["long"],item["lat"],item["long"]) > filter["radius"]){
          console.log("exitnt")
          return false
          }
        }
        else if (filter[key] && item[key] != filter[key]){
          console.log("exitntfvfv")
          return false;
        }
      }
      
      return true;
    });
  }
  
  function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

  res.send({"poem_list": poem_list, 
            "length": poem_list.length, 
            "status" : true, 
            "msg": null})

})



module.exports = router

