import express from 'express'
import path from 'path'
import fs from 'fs'
import fileUpload from 'express-fileupload'
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))

async function openDb() {
  return open({
    filename: './models/database.db',
    driver: sqlite3.Database
  })
}

const addAuthor = async (req, res) => {
  if (!req.body || !req.files) {
    res.sendStatus(500)
  }

  const image = req.files.image
  const fileName = Date.now() + '_' + image.name
  const authorName = req.body.name
  const filePath = `../client/public/authors/${authorName}/${fileName}`
  await fs.mkdir(`../client/public/authors/${authorName}`, function () {
  })
  await image.mv(filePath)

  const path = `authors/${authorName}/${fileName}`
  await openDb()
    .then(db => {
      db.run(`INSERT INTO Authors (name, image)
              VALUES ("${authorName}", "${path}")`)
        .then(() => {
          console.log("Added")
          res.sendStatus(200)
        })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}

const addAlbum = async (req, res) => {
  if (!req.body || !req.files) {
    res.sendStatus(500)
  }
  const image = req.files.image
  const fileName = Date.now() + '_' + image.name
  const authorName = req.body.name
  const filePath = `../client/public/authors/${authorName}/${fileName}`
  await fs.mkdir(`../client/public/authors/${authorName}`, () => null)
  await image.mv(filePath)

}

const addTrack = async (req, res) => {
  if (!req.body || !req.files) {
    res.sendStatus(500)
    console.log("ERROR")
  }

  try {
    const author = JSON.parse(req.body.author)
    const {albumTitle, trackTitle} = req.body
    const {albumImage, trackImage, trackFile} = req.files
    const albumPath = `../client/public/authors/${author.name}/${albumTitle}`
    const trackPath = albumPath + `/${trackTitle}`

    await fs.mkdir(albumPath, () => null)
    await fs.mkdir(trackPath, () => null)

    const albumImageName = Date.now() + '_' + albumImage.name
    const trackImageName = Date.now() + '_' + trackImage.name
    const trackName = Date.now() + '_' + trackFile.name

    await albumImage.mv(albumPath + `/${albumImageName}`, () => null)
    await trackImage.mv(trackPath + `/${trackImageName}`, () => null)
    await trackFile.mv(trackPath + `/${trackName}`, () => null)

    await openDb().then(db => {
      db.run()
    })

    await openDb().then(db => {
      db.run()
    })
  } catch (error) {
    console.error(error)
    res.send(error)
    res.sendStatus(500)
  }

  res.sendStatus(200)
}

app.get('/', (req, res) => {
  openDb()
    .then(db => {
      const result = db.get('SELECT * FROM Tracks')
      res.json(result)
    })
    .catch((err) => {
      console.log('Error on Get Tracks')
      console.log(err)
    })
})

app.post('/add_author', addAuthor)
app.post('/add_album', addAlbum)
app.post('/add_track', addTrack)

app.post('/authors', (req, res) => {
  openDb()
    .then((db) => {
      db.all(`SELECT *
              FROM Authors`)
        .then(data => {
          res.json(data)
        })
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Backend started on port ${PORT}...`))