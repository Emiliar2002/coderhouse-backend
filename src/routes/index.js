const {Router} = require('express')
const router = Router()

const indexApiRouter = require('./api/api.router');
const rendersRouter = require('./renders/renders.router')

router.get('/health', (_req, res) => {
    res.status(200).send({
        success: true,
        environment: process.env.ENV || 'undefined',
        health: 'up'
    })
})
.use('/api', indexApiRouter)
.use('/', rendersRouter)


module.exports = router