const Router = require('express')
const router = new Router()
const ticketsController = require('../controllers/ticketsController')

router.get('/', ticketsController.getAll)
router.get('/checkTicket', ticketsController.checkTicket)
router.post('/signIn', ticketsController.signIn)

module.exports = router