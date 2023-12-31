const express = require('express')
const authorRouter = require('./routes/artist.routes')
const albumRouter = require('./routes/album.routes')
const trackRouter = require('./routes/track.routes')
const {initDB} = require('./db')

const fileUpload = require('express-fileupload')
const cors = require('cors')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cors())

app.use('/api', authorRouter)
app.use('/api', albumRouter)
app.use('/api', trackRouter)

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}...`)
})