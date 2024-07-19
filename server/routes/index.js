const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const courseRouter = require('./courseRouter')
const languageRouter = require('./languageRouter')
const ticketsRouter = require('./ticketsRouter')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/course', courseRouter)
router.use('/language', languageRouter)
router.use('/tickets', ticketsRouter)

module.exports = router