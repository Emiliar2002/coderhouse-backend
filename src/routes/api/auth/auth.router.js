const {Router} = require('express');
const AuthService = require('../../../services/auth/auth.services');
const router = Router();

const authService = new AuthService()

router.post('/login', async (req, res) => {
    try{
    const {user} = req.body
    console.log(req.body)
    const data = authService.login(req, user)

    let statusCode = data.success ? 200 : 400

    return res.status(statusCode).json({
        ...data
    })

    }catch(e){
        next(e)
    }
});

router.post('/logout', async(req, res) => {
    try{
        const {user} = req.body
        const data = authService.isAuthenticated(req)
        if(!data.success){
            return res.status(400).json({
                ...data
            })
        }
        req.session.destroy()
        return res.status(200).json({
            success: true,
            data: user
        })
    }catch(e){
        next(e)
    }
})

module.exports = router;