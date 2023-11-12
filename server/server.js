const express = require('express')

const fileUpload = require('express-fileupload')
const cors = require('cors')
const {openDb, addAuthor, addAlbum, addTrack} = require("./models/db");

require('dotenv').config()
const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(fileUpload({}))
app.use(cors())

app.post('/add_author', addAuthor)
app.post('/add_album', addAlbum)
app.post('/add_track', addTrack)

const getAuthors = async (req, res) => {
  try {
    const db = await openDb()
    const authors = await db.all(`SELECT *
                                  FROM Authors`)
    res.status(200).json(authors)
  } catch (err) {
    console.log('getAuthors Error')
    res.status(500).json({Message: "ERROR"})
  }
}

const getTracks = async (req, res) => {
  try {
    const db = await openDb()
    const data = await db.all('SELECT * FROM Tracks')
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({Message: "ERROR"})
  }
}

app.get('/tracks', getTracks)
app.post('/authors', getAuthors)

app.listen(PORT, () => console.log(`Backend started on port ${PORT}...`))