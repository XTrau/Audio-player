const authorService = require('../services/author.service')

class AuthorController {
  async create(req, res) {
    try {
      const author = await authorService.create(req.body, req.files.image)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const authors = await authorService.getAll()
      res.json(authors)
    } catch (e) {
      res.status(500).json(e)
    }

  }

  async getOne(req, res) {
    try {
      const author = await authorService.getOne(req.params.id)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const updatedAuthor = await authorService.update(req.body, req.files?.image)
      res.json(updatedAuthor)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete(req, res) {
    try {
      const author = await authorService.delete(req.params.id)
      res.json(author)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new AuthorController()