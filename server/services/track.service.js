const db = require("../db");
const fileService = require('../file.service')

class TrackService {
  async create(track, files) {
    if (!files) throw new Error('Нету файлов трека')
    const image_url = fileService.uploadImage(files.image)
    const audio_url = fileService.uploadAudio(files.audio)
    const createdTrack = db.query('INSERT INTO track (name, image_url, audio_url, album_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [track.name, image_url, audio_url, track.album_id])
    const authors = JSON.parse(track.authors)
    for (let i in authors)
      await db.query(`INSERT INTO author_track (author_id, track_id)
                      VALUES ($1, $2)`, [authors[i], createdTrack.rows[0].id])
    return createdTrack.rows[0]
  }

  async getAll(req, res) {
    const tracks = await db.query(
      `SELECT jsonb_build_object(
                      'id', track.id,
                      'name', track.name,
                      'image_url', track.image_url,
                      'audio_url', track.audio_url,
                          'album', (SELECT json_agg(json_build_object(
                      'id', album.id,
                      'name', album.name,
                      'image_url', album.image_url
                                                    ))
                                    FROM album
                                    WHERE album.id = track.album_id),
                      'authors', (SELECT json_agg(json_build_object(
                      'id', author.id,
                      'name', author.name,
                      'image_url', author.image_url
                                                  ))
                                  FROM author
                                           JOIN author_track ON author.id = author_track.author_id
                                  WHERE author_track.track_id = track.id))
       FROM track`
    )
    return tracks.rows
  }

  async getOne(id) {
    if (!id) throw new Error('Не указан ID')
    const track = await db.query(`SELECT *
                                  FROM track
                                  WHERE id = $1`, [id])
    return track.rows[0]
  }


  async update(track, files) {
    const oldTrack = db.query(`SELECT *
                               FROM track
                               WHERE id = $1`, [track.id])
    if (files.image) {
      const newUrl = fileService.replaceImage(oldTrack.rows[0].image_url, files.image)
      await db.query(`UPDATE track
                      set image_url=$1
                      WHERE id = $2`, [newUrl, track.id])
    }
    if (files.audio) {
      const newUrl = fileService.replaceAudio(oldTrack.rows[0].audio_url, files.audio)
      await db.query(`UPDATE track
                      set audio_url=$1
                      WHERE id = $2`, [newUrl, track.id])
    }
    const newTrack = db.query('UPDATE track set name = $1 WHERE id = $2 RETURNING *', [track.name, track.id])
    return newTrack.rows[0]
  }

  async delete(id) {
    if (!id) throw new Error('Не указан ID')
    const track = db.query("DELETE FROM track WHERE id = $1 RETURNING *", [id])
    return track.rows[0]
  }
}

module.exports = new TrackService()