exports.NotFound = (req, res, next) =>{ 
    const error = new Error("404, Not found");
    error.status = 404;
    next(error);
};

exports.InternalServerError = (req, res) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
}