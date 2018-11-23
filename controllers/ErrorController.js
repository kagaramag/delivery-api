exports.NotFound = (req, res) =>{ 
    res.status(404).send({
        message: "Error 404. Page not found"
    });
};
exports.InternalServerError = (req, res) => {
    res.status(500).send({
        message: "Error 505. Page not found"
    });
}