const db = require('../db')

class UserService {
  async registration(userData) {
    if (!userData.email || !userData.password || userData.username)
      throw new Error("Указаны не все поля пользователя")
    const checkUser = await db.query(`SELECT * FROM users WHERE email='$1' OR username='$2'`)
    if (!checkUser.rows) throw Error("Пользователь уже существует")
    const user = await db.query(`INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *`, userData.email, userData.password, userData.username)
    return user
  }

  async login() {

  }

  async logout() {

  }

  async getUsers() {
    const users = await db.query(`SELECT * FROM users`)
    return users.rows
  }
}

module.exports = new UserService()