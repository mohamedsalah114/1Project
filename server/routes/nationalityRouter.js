const Router = require('express')
const router = new Router()
const nationalityController = require('../controllers/nationalityController')

router.get('/', nationalityController.getAll)

module.exports = router