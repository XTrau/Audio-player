const Router = require('express')
const router = new Router()
const UserController = require('../controllers/user.controller')

router.post('/registration', UserController.registration)
router.get('/login', UserController.login)
router.get('/logout', UserController.logout)
router.get('/getUsers', UserController.getUsers)

module.exports = router