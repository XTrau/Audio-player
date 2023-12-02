const db = require('../db')
const fileService = require('../file.service')


class ArtistService {
  async create(artist, image) {
    if (!image) throw new Error('Нету Файла')
    const image_url = fileService.uploadImage(image)
    const createdArtist = await db.query('INSERT INTO artist (name, image_url) VALUES ($1, $2) RETURNING *', [artist.name, image_url])
    return createdArtist.rows[0]
  }

  async getAll() {
    const artists = await db.query(
      `SELECT json_agg(json_build_object(
                      'id', id,
                      'name', name,
                      'image_url', image_url,
                      'albums', (SELECT jsonb_agg(jsonb_build_object(
                      'id', id,
                      'name', name,
                      'image_url', image_url,
                      'tracks', (SELECT jsonb_agg(jsonb_build_object(
                              'id', id,
                              'name', name,
                              'image_url', image_url,
                              'audio_url', audio_url,
                              'artists', (SELECT jsonb_agg(jsonb_build_object(
                                      'id', id,
                                      'name', name,
                                      'image_url', image_url
                                                           ))
                                          FROM artist auth
                                                   JOIN artist_track at ON auth.id = at.artist_id
                                          WHERE at.track_id = t.id)
                                                  ))
                                 FROM track t
                                 WHERE t.album_id = alb.id)))
                                 FROM album alb
                                          JOIN artist_album aa ON alb.id = aa.album_id
                                 WHERE aa.artist_id = artist.id)
              )) as list
       FROM artist;`
    )

    return artists.rows[0].list
  }

  async getOne(id) {
    if (!id) throw new Error('Не указан ID')
    const artist = await db.query(
      `SELECT jsonb_agg(jsonb_build_object(
              'id', art.id,
              'name', art.name,
              'image_url', art.image_url,
              'albums', (SELECT jsonb_agg(jsonb_build_object(
                      'id', alb.id,
                      'name', alb.name,
                      'image_url', alb.image_url,
                      'tracks', (SELECT jsonb_agg(jsonb_build_object(
                              'id', track.id,
                              'name', track.name,
                              'image_url', track.image_url,
                              'audio_url', track.audio_url,
                              'artists', (
                              SELECT jsonb_agg(jsonb_build_object(
                                      'id', artist.id,
                                      'name', artist.name,
                                      'image_url', artist.image_url
                                                           ))
                                          FROM artist
                                                   JOIN artist_track ON artist.id = artist_track.artist_id
                                          WHERE artist_track.track_id = track.id)
                                                  ))
                                 FROM track
                                 WHERE track.album_id = alb.id)))
                         FROM album alb
                                  JOIN artist_album aa ON alb.id = aa.album_id
                         WHERE aa.artist_id = art.id)
                        )) AS artist
       FROM artist art
       WHERE art.id = $1;`, [id])
    return artist.rows[0]
  }


  async update(artist, image) {
    if (!artist.id) throw new Error('Не указан ID')
    if (image) {
      const prevAuthor = await this.getOne(artist.id)
      const newUrl = fileService.replaceImage(prevAuthor.image_url, image)
      await db.query(`UPDATE artist
                      set image_url=$1
                      WHERE id = $2
                      RETURNING *`, [newUrl, artist.id])
    }
    const updatedAuthor = await db.query(`UPDATE artist
                                          set name=$1
                                          WHERE id = $2
                                          RETURNING *`, [artist.name, artist.id])
    return updatedAuthor.rows[0]
  }

  async delete(id) {
    if (!id) throw new Error('Не указан ID')
    const artist = await db.query('DELETE FROM artist WHERE id = $1 RETURNING *', [id])
    fileService.removeFile(artist.rows[0].image_url)
    return artist.rows[0]
  }
}

module.exports = new ArtistService()