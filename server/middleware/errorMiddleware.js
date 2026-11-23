const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400
    }

    // Handle invalid MongdoDb IDs
    if(err.name === 'CastError') {
        statusCode = 400
        message = 'Invalid resource ID'
    }

    res.status(statusCode).json({
        success: false,
        message
    })
}

module.exports = errorMiddleware