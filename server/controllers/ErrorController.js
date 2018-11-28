const NotFound = (req, res) =>{ 
    res.status(404).send({
        message: "Error 404. Page not found"
    });
};
const InternalServerError = (req, res) => {
    res.status(500).send({
        message: "Error 505. Page not found"
    });
}

// // error handler
// const InternalServerError = (err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.send({
//         error: err.status
//     });
// };

export default { NotFound, InternalServerError }