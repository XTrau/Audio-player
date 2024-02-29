const db = require("../db");
const fileService = require('../file.service')

class TrackService {
  async create(track, files) {
    if (!files.image || !files.audio || !track.title) throw new Error('Нехватает файлов трека')
    const image_url = fileService.uploadImage(files.image)
    const audio_url = fileService.uploadAudio(files.audio)
    const createdTrack = await db.query('INSERT INTO track (name, image_url, audio_url, album_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [track.title, image_url, audio_url, track.album_id])

    const artists = JSON.parse(track.artists)
    for (const artist of artists) {
      await db.query(`INSERT INTO artist_track (artist_id, track_id)
                      VALUES ($1, $2)`, [artist.id, createdTrack.rows[0].id])
    }

    return createdTrack.rows[0]
  }

  async getAll() {
    const tracks = await db.query(
      `SELECT jsonb_agg(jsonb_build_object(
              'id', track.id,
              'name', track.name,
              'image_url', track.image_url,
              'audio_url', track.audio_url,
              'album',
              (SELECT json_agg(json_build_object(
                      'id', album.id,
                      'name', album.name,
                      'image_url', album.image_url))
               FROM album
               WHERE album.id = track.album_id),
              'artists',
              (SELECT json_agg(json_build_object(
                      'id', artist.id,
                      'name', artist.name,
                      'image_url', artist.image_url
                               ))
               FROM artist
                        JOIN artist_track ON artist.id = artist_track.artist_id
               WHERE artist_track.track_id = track.id))) AS list
       FROM track`
    )
    return tracks.rows[0].list
  }

  async getOne(id) {
    if (!id) throw new Error('Не указан ID')
    const track = await db.query(`SELECT *
                                  FROM track
                                  WHERE id = $1`, [id])
    return track.rows[0]
  }


  async update(track, files) {
    if (!track.title || !track.id) throw Error("Нету данных трека")
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
    const newTrack = db.query('UPDATE track set name = $1 WHERE id = $2 RETURNING *', [track.title, track.id])
    return newTrack.rows[0]
  }

  async delete(id) {
    if (!id) throw new Error('Не указан ID')
    const track = db.query("DELETE FROM track WHERE id = $1 RETURNING *", [id])
    return track.rows[0]
  }
}

module.exports = new TrackService()