const express = require('express')
const router = express.Router()
const axios = require('axios');

router.get('/api/cta', async (req, res) => {
    const response = await axios.get('https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=172&format=json')
    res.json(response.data)
})

module.exports = router
