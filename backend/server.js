require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const port = process.argv[2] || 80

const REST_API = require('./REST-API.js')
app.use(REST_API)

app.use(express.static(path.join(__dirname, '../frontend')))

app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log(`server is listening, visit http://localhost:${port}, press CTRL+C to quit.`)
})
