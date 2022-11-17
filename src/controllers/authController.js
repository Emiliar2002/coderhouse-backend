exports.isAdmin = (_req, res, next) => {
    try{
        const verification = true
        next()
    }catch(e){
        return res
        .status(403)
        .json({
            success: false,
            error: e.message,
        })
    }
}