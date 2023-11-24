const Router = require('express')
const router = new Router()
const trackController = require('../controllers/track.controller')

router.post('/track', trackController.create)
router.get('/track', trackController.getAll)
router.get('/track/:id', trackController.getOne)
router.put('/track', trackController.update)
router.delete('/track/:id', trackController.delete)

module.exports = router