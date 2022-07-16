const Router = require('express')
const router = new Router()
const measureRouter = require('../controllers/measureController')

router.get('/', measureRouter.getAll)

module.exports = router