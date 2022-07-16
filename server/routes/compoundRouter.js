const Router = require('express')
const router = new Router()
const compoundRouter = require('../controllers/compoundController')

router.get('/:id', compoundRouter.getCompound)

module.exports = router