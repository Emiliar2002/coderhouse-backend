const {Router} = require('express');
const router = Router();

router.get('/', async (_req, res) => {

    try{
        res.render('edit')
    }catch(e){
        next(e);
    };

});
module.exports = router;