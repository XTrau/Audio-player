const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const fs = require("fs");
const {add} = require("nodemon/lib/rules");

async function openDb() {
  return open({
    filename: './models/database.db',
    driver: sqlite3.Database
  })
}

const addAuthor = async (req, res) => {
  if (!req.body || !req.files) {
    res.status(500).send
  }

  try {
    const image = req.files.image
    const fileName = Date.now() + '_' + image.name
    const authorName = req.body.name

    const authorPath = `../client/public/authors/${authorName}`
    const filePath = authorPath + `/${fileName}`
    const getPath = `authors/${authorName}/${fileName}`

    await fs.mkdir(authorPath, () => {
      console.log(`Directory maked in path ${authorPath}`)
    })

    await image.mv(filePath)
    const db = await openDb()
    await db.run(`INSERT INTO Authors (name, image)
                  VALUES ("${authorName}", "${getPath}")`)
    res.status(200).send()
  } catch (error) {
    console.log('addAuthor Error')
    console.log(error)
    res.status(500).json({Message: "Error"})
  }
}

const addAlbum = async (req, res) => {
  if (!req.body || !req.files) {
    res.status(500).send()
  }

  try {
    const image = req.files.image
    const fileName = Date.now() + '_' + image.name
    const authorName = req.body.name
    const filePath = `../client/public/authors/${authorName}/${fileName}`
    await fs.mkdir(`../client/public/authors/${authorName}`, () => null)
    await image.mv(filePath)

    const db = await openDb()
  } catch (error) {
    console.log('addAuthor Error')
    console.log(error)
    res.status(500).json({Message: "Error"})
  }
}

const addTrack = async (req, res) => {
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
    const trackFileName = Date.now() + '_' + trackFile.name

    await albumImage.mv(albumPath + `/${albumImageName}`, () => null)
    await trackImage.mv(trackPath + `/${trackImageName}`, () => null)
    await trackFile.mv(trackPath + `/${trackFileName}`, () => null)

    const albumImagePath = `authors/${author.name}/${albumTitle}/${albumImageName}`
    const trackImagePath = `authors/${author.name}/${albumTitle}/${trackTitle}/${trackImageName}`
    const trackFilePath = `authors/${author.name}/${albumTitle}/${trackTitle}/${trackFileName}`

    const db = await openDb()
    const checkAlbum = await db.get(`SELECT *
                                     FROM Album
                                     Where title = "${albumTitle}"
                                       and authorID = "${author.id}"`)
    if (!checkAlbum) {
      await db.run(`INSERT INTO Album (title, authorID, image)
                    VALUES ("${albumTitle}", "${author.id}", "${albumImagePath}")`)
    }
    const album = await db.get(`SELECT *
                                FROM Album
                                WHERE title = '${albumTitle}'
                                  AND authorID = '${author.id}'`)
    await db.run(`INSERT INTO Tracks (authorID, authorName, albumID, title, audio, image)
                  VALUES (${author.id}, "${author.name}", ${album.id}, "${trackTitle}", "${trackFilePath}", "${trackImagePath}")`)
    console.log("added")

    res.status(200).send()
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports.openDb = openDb
module.exports.addAuthor = addAuthor
module.exports.addAlbum = addAlbum
module.exports.addTrack = addTrack