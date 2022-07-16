const Router = require('express')
const router = new Router()
const messagesController = require('../controllers/messagesController')

router.post('/', messagesController.create)
router.get('/:id', messagesController.getDishComments)

module.exports = router