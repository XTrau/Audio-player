const db = require('../db')
const fileService = require('../file.service')

class AlbumService {
  async create(album, image) {
    if (!album.name || !album.artists || !image) throw Error('Заполнены не все поля')
    const image_url = fileService.uploadImage(image)
    const newAlbum = await db.query('INSERT INTO album (name, image_url) VALUES ($1, $2) RETURNING *', [album.name, image_url])

    const artists = JSON.parse(album.artists)

    console.log(artists)
    for (const artist of artists)
      await db.query('INSERT INTO artist_album (artist_id, album_id) VALUES ($1, $2)', [artist.id, newAlbum.rows[0].id])

    return newAlbum.rows[0]
  }

  async getAll() {
    const albums = await db.query(
      `SELECT jsonb_build_object(
                      'id', album.id,
                      'name', album.name,
                      'image_url', album.image_url,
                      'tracks', (SELECT jsonb_agg(json_build_object(
                      'id', track.id,
                      'name', track.name,
                      'image_url', track.image_url,
                      'audio_url', track.audio_url,
                      'artists', (SELECT jsonb_agg(json_build_object(
                              'id', artist.id,
                              'image_url', artist.image_url,
                              'name', artist.name
                                                   ))
                                  FROM artist
                                           JOIN artist_track
                                                ON track.id = artist_track.track_id
                                  WHERE artist.id = artist_track.artist_id)
                                                  ))
                                 FROM track
                                 WHERE track.album_id = album.id),
                      'artists', (SELECT jsonb_agg(json_build_object(
                      'id', artist.id,
                      'name', artist.name,
                      'image_url', artist.image_url
                                                   ))
                                  FROM artist
                                           JOIN artist_album ON artist.id = artist_album.artist_id
                                  WHERE album.id = artist_album.album_id)
              ) AS album
       FROM album;`
    )
    return albums.rows
  }

  async getOne(id) {
    const album = await db.query(
      `SELECT jsonb_build_object(
                      'id', album.id,
                      'name', album.name,
                      'image_url', album.image_url,
                      'tracks', (SELECT jsonb_agg(json_build_object(
                      'id', track.id,
                      'name', track.name,
                      'image_url', track.image_url,
                      'audio_url', track.audio_url,
                      'artists', (SELECT jsonb_agg(json_build_object(
                              'id', artist.id,
                              'image_url', artist.image_url,
                              'name', artist.name
                                                   ))
                                  FROM artist
                                           JOIN artist_track
                                                ON track.id = artist_track.track_id
                                  WHERE artist.id = artist_track.artist_id)
                                                  ))
                                 FROM track
                                 WHERE track.album_id = album.id),
                      'artists', (SELECT jsonb_agg(json_build_object(
                      'id', artist.id,
                      'name', artist.name,
                      'image_url', artist.image_url
                                                   ))
                                  FROM artist
                                           JOIN artist_album ON artist.id = artist_album.artist_id
                                  WHERE album.id = artist_album.album_id)
              ) AS album
       FROM album
       WHERE album.id = $1;`, [id])
    return album.rows[0]
  }


  async update(album, image) {
    if (!album.id) throw new Error('Не указан ID')
    if (image) {
      const prevAlbum = await this.getOne(album.id)
      const newUrl = fileService.replaceImage(prevAlbum.image_url, image)
      await db.query(`UPDATE album
                      set image_url=$1
                      WHERE id = $2
                      RETURNING *`, [newUrl, album.id])
    }
    const updatedAlbum = await db.query(`UPDATE album
                                         set name=$1
                                         WHERE id = $2
                                         RETURNING *`, [album.name, album.id])
    return updatedAlbum.rows[0]
  }

  async delete(id) {
    if (!id) throw new Error('Не указан ID')
    await db.query('DELETE FROM artist_album WHERE album_id = $1', [id])
    const album = await db.query('DELETE FROM album WHERE id = $1 RETURNING *', [id])
    fileService.removeFile(album.rows[0].image_url)
    return album.rows[0]
  }
}

module.exports = new AlbumService()