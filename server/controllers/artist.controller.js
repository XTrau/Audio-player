const artistService = require('../services/artist.service')

class ArtistController {
  async create(req, res) {
    try {
      const author = await artistService.create(req.body, req.files.image)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const authors = await artistService.getAll()
      res.json(authors)
    } catch (e) {
      res.status(500).json(e)
    }

  }

  async getOne(req, res) {
    try {
      const author = await artistService.getOne(req.params.id)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const updatedAuthor = await artistService.update(req.body, req.files?.image)
      res.json(updatedAuthor)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete(req, res) {
    try {
      const author = await artistService.delete(req.params.id)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new ArtistController()