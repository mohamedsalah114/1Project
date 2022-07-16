const Router = require('express')
const router = new Router()
const specialGroupController = require('../controllers/specialGroupController')

router.get('/', specialGroupController.getAll)

module.exports = router