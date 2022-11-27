const express = require('express')
const router = express.Router()

router.get('/api/example', (req, res) => {
  res.json({ status: 'success', message: 'this is an example' })
})

module.exports = router