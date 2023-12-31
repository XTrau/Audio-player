const express = require('express')
const authorRouter = require('./routes/artist.routes')
const albumRouter = require('./routes/album.routes')
const trackRouter = require('./routes/track.routes')

const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT ?? 5000

require('dotenv').config()
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cors())

app.use('/api', authorRouter)
app.use('/api', albumRouter)
app.use('/api', trackRouter)

app.get('/test', (req, res) => {
  res.json({MESSAGE: "HELLO"});
})

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}...`)
})