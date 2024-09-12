const errorHandler = (error,request,response,next) => {
    
    response.status(error.status || 500).json({
        "error" : true , 
        "message" : error.message || "Internal server error"
    })
}

module.exports = errorHandler