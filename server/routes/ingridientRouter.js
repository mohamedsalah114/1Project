const Router = require('express')
const router = new Router()
const ingridientController = require('../controllers/ingridientController')

router.get('/', ingridientController.getAll)

module.exports = router