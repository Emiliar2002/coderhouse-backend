const {Router} = require('express');
const AuthService = require('../../services/auth/auth.services');
const router = Router();
const authService = new AuthService()

router.get('/', async (req, res) => {
    try{
        const {user} = req.session
        if(!authService.isAuthenticated(req).success){
            return res.send('NO ESTAS AUTENTICADO')
        }
        return res.render('logout', {user})
    }catch(e){
        next(e);
    };

});

module.exports = router;