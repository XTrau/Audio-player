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

app.post('/add_author', (req, res) => {
  if (!req.body || !req.files) {
    res.sendStatus(500)
  }

  const image = req.files.image
  const fileName = Date.now() + '_' + image.name
  const authorName = req.body.name
  const filePath = `../client/public/authors/${authorName}/${fileName}`
  fs.mkdir(`../client/public/authors/${authorName}`, () => {})
  image.mv(filePath)

  const path = `authors/${authorName}/${fileName}`
  openDb()
    .then(db => {
      db.run(`INSERT INTO Authors (name, image)
              VALUES ("${authorName}", "${path}")`)
        .then(() => {
          console.log("Added")
          res.sendStatus(200)
        })
        .catch(err => {
          console.log('Error Write to DB')
          console.log(err)
          res.sendStatus(500)
        })
    })
    .catch(err => {
      console.log('Error Open DB')
      console.log(err)
      res.sendStatus(500)
    })
})

app.listen(PORT, () => console.log(`Backend started on port ${PORT}...`))