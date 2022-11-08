const express = require('express')
const router = express.Router()
const axios = require('axios');
const { response } = require('express');

router.get('/api/cta', async (req, res) => {
    const potato = await axios.get('https://ctabustracker.com/bustime/api/v3/getvehicles?key=gbNab8LFcBWDx5qmtc8Q8dfjb&rt=172&format=json')
    res.json(potato.data)
    //Got first lat of bus on route 172
    console.log(potato.data['bustime-response']['vehicle'][0]['lat'])
})
//check database --> fetch from CTA
module.exports = router
