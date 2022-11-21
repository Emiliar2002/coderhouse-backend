const errorHandler = (err, _req, res, _next) => {
    console.error(err)
    res.status(500).json({
        success: false,
        data: err.message
    })
}

module.exports = errorHandler;