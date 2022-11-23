const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

// const fs = require('fs')

router.use(bodyParser.json())

router.post('/api/add-poem', (req, res) => {
  // TODO: can let this be a JSON object as required
  // addPoem(JSON.stringify(req.body))

  // addPoem does not return anything hence post request will return success each time
  res.json(
    {
      message: 'success'
    }
  )
})

module.exports = router
