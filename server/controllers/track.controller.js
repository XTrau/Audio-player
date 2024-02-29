const trackService = require('../services/track.service')

class TrackController {
  async create(req, res) {
    try {
      const track = await trackService.create(req.body, req.files)
      res.json(track)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const tracks = await trackService.getAll()
      res.json(tracks)
    } catch (e) {
      res.status(500).json(e)
    }

  }

  async getOne(req, res) {
    try {
      const track = await trackService.getOne(req.query.id)
      res.json(track)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const track = await trackService.update(req.body, req.files)
      res.json(track)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete(req, res) {
    try {
      const track = await trackService.delete(req.params.id)
      res.json(track)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new TrackController()