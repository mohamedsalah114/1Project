const Router = require('express')
const router = new Router()
const languageController = require('../controllers/languageController')

router.get('/', languageController.getAll)

module.exports = router