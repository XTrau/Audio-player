import express from 'express'
import path from 'path'
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json())
app.use(cors())

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
  if (!req.body && !req.files) {
    res.sendStatus(500)
  }

  openDb()
    .then(db => {
      db.run(``)
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