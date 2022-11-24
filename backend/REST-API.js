const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const addPoem = require('./rest-api-test-new-data.js')

router.use(bodyParser.json())

router.post('/api/add-poem', (req, res) => {
  const check = addPoem(req.body)
  if (check.status === 1) {
    res.json({ message: 'success' })
  } else {
    res.json({ message: 'failure', error: check.msg })
  }
})

module.exports = router
