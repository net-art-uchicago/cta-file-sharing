const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

/**
 * req should be a json Object
 * check req.headers -> Content-Type: application/json
 * actual data recieved: req.body
 * 
 * response should be in json
 * 
 */


router.post('/api/add-poem', (req, res) => {
  console.log(req.body)

  
})


module.exports = router
