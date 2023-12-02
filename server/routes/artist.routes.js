const Router = require('express')
const router = new Router()
const artistController = require('../controllers/artist.controller')

router.post('/artist', artistController.create)
router.get('/artist', artistController.getAll)
router.get('/artist/:id', artistController.getOne)
router.put('/artist', artistController.update)
router.delete('/artist/:id', artistController.delete)

module.exports = router