const Router = require('express')
const router = new Router()
const authorController = require('../controllers/author.controller')

router.post('/author', authorController.create)
router.get('/author', authorController.getAll)
router.get('/author/:id', authorController.getOne)
router.put('/author', authorController.update)
router.delete('/author/:id', authorController.delete)

module.exports = router