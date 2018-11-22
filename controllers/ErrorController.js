exports.NotFound = (req, res) =>{ 
    res.status(404).send({
        message: "Error 404. Page not found"
    });
};

exports.InternalServerError = (req, res) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
}