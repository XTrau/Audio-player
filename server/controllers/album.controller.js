const albumService = require('../services/album.service')

class AlbumController {
  async create(req, res) {
    try {
      const album = await albumService.create(req.body, req.files.image)
      res.json(album)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const albums = await albumService.getAll()
      res.json(albums)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    try {
      const album = await albumService.getOne(req.params.id)
      res.json(album)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const updatedAlbum = await albumService.update(req.body, req.files?.image)
      res.json(updatedAlbum)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete(req, res) {
    try {
      const album = await albumService.delete(req.params.id)
      res.json(album)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new AlbumController()