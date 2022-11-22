const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/api/cta', async (req, res) => {
  const response = await axios.get('ctaHandler')
  const data = await response.json()
  res.json(response.data)
})

module.exports = router
