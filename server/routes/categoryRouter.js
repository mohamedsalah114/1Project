const Router = require('express')
const router = new Router()
const categoryRouter = require('../controllers/categoryController')

router.get('/', categoryRouter.getAll)

module.exports = router