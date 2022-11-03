const {Router} = require('express')
const router = Router()

const indexApiRouter = require('./api/api.router');
const rendersRouter = require('./renders/renders.router')

router.use('/api', indexApiRouter)
router.use('/', rendersRouter)


module.exports = router