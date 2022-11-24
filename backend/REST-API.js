const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

// const fs = require('fs')
const addPoem = require('./rest-api-test-new-data.js')

router.use(bodyParser.json())

router.post('/api/add-poem', (req, res) => {
  // TODO: can let this be a JSON object as required
  // addPoem(JSON.stringify(req.body))

  const status = addPoem(req.body)

  if (status) {
    res.json(
      {
        message: 'success'
      }
    )
  } else {
    res.json(
      {
        message: 'failure',
        error: status
      }
    )
  }
})

module.exports = router
