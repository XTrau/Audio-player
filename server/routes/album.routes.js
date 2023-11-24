const Router = require('express')
const router = new Router()
const albumController = require('../controllers/album.controller')

router.post('/album', albumController.create)
router.get('/album', albumController.getAll)
router.get('/album/:id', albumController.getOne)
router.put('/album', albumController.update)
router.delete('/album/:id', albumController.delete)

module.exports = router