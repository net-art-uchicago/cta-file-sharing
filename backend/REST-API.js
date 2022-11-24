const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const addPoem = require('./rest-api-test-new-data.js')

router.use(bodyParser.json())

router.post('/api/add-poem', (req, res) => {
  const status = addPoem(req.body)

  if (status) {
    res.json({ message: 'success' })
  } else {
    res.json({ message: 'failure', error: status })
  }
})

module.exports = router
