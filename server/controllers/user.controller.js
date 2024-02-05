const db = require('../db')
const UserService = require('../services/user.service')

class UserController {
  async registration(req, res) {
    try {
      const {email, password, username} = req.body
      const user = await UserService.registration({email, password, username})
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async login(req, res) {
    try {

    } catch (e) {
      res.status(500).json(e)
    }
  }

  async logout(req, res) {
    try {

    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getUsers(req, res) {
    try {
      const users = UserService.getUsers()
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new UserController()