const db = require('../db')
const fileService = require('../file.service')


class AuthorService {
  async create(author, image) {
    const image_url = fileService.uploadImage(image)
    const createdAuthor = await db.query('INSERT INTO author (name, image_url) VALUES ($1, $2) RETURNING *', [author.name, image_url])
    return createdAuthor.rows[0]
  }

  async getAll() {
    const authors = await db.query(
      `SELECT jsonb_build_object(
                      'id', author.id,
                      'name', author.name,
                      'image_url', author.image_url,
                      'albums', (SELECT jsonb_agg(jsonb_build_object(
                      'id', alb.id,
                      'name', alb.name,
                      'image_url', alb.image_url,
                      'tracks', (SELECT jsonb_agg(jsonb_build_object(
                              'id', t.id,
                              'name', t.name,
                              'image_url', t.image_url,
                              'audio_url', t.audio_url,
                              'authors', (SELECT jsonb_agg(jsonb_build_object(
                                      'id', auth.id,
                                      'name', auth.name,
                                      'image_url', auth.image_url
                                                           ))
                                          FROM author auth
                                                   JOIN author_track at ON auth.id = at.author_id
                                          WHERE at.track_id = t.id)
                                                  ))
                                 FROM track t
                                 WHERE t.album_id = alb.id)))
                                 FROM album alb
                                          JOIN author_album aa ON alb.id = aa.album_id
                                 WHERE aa.author_id = author.id)
              ) AS author
       FROM author;`
    )

    return authors.rows
  }

  async getOne(id) {
    if (!id) throw new Error('Не указан ID')
    const author = await db.query(
      `SELECT jsonb_build_object(
                      'id', a.id,
                      'name', a.name,
                      'image_url', a.image_url,
                      'albums', (SELECT jsonb_agg(jsonb_build_object(
                      'id', alb.id,
                      'name', alb.name,
                      'image_url', alb.image_url,
                      'tracks', (SELECT jsonb_agg(jsonb_build_object(
                              'id', t.id,
                              'name', t.name,
                              'image_url', t.image_url,
                              'audio_url', t.audio_url,
                              'authors', (SELECT jsonb_agg(jsonb_build_object(
                                      'id', auth.id,
                                      'name', auth.name,
                                      'image_url', auth.image_url
                                                           ))
                                          FROM author auth
                                                   JOIN author_track at ON auth.id = at.author_id
                                          WHERE at.track_id = t.id)
                                                  ))
                                 FROM track t
                                 WHERE t.album_id = alb.id)))
                                 FROM album alb
                                          JOIN author_album aa ON alb.id = aa.album_id
                                 WHERE aa.author_id = a.id)
              ) AS author
       FROM author a
       WHERE a.id = $1;`, [id])
    return author.rows[0]
  }


  async update(author, image) {
    if (!author.id) throw new Error('Не указан ID')
    if (image) {
      const prevAuthor = await this.getOne(author.id)
      const newUrl = fileService.replaceImage(prevAuthor.image_url, image)
      await db.query(`UPDATE author
                      set image_url=$1
                      WHERE id = $2
                      RETURNING *`, [newUrl, author.id])
    }
    const updatedAuthor = await db.query(`UPDATE author
                                          set name=$1
                                          WHERE id = $2
                                          RETURNING *`, [author.name, author.id])
    return updatedAuthor.rows[0]
  }

  async delete(id) {
    if (!id) throw new Error('Не указан ID')
    const author = await db.query('DELETE FROM author WHERE id = $1 RETURNING *', [id])
    fileService.removeFile(author.rows[0].image_url)
    return author.rows[0]
  }
}

module.exports = new AuthorService()