const ApiError = require("./ApiError")

function errorHandler(err,req,res,next)
{
    console.log(err)
    if(err instanceof ApiError)
    {
        res.status(err.code).json(err.message);
        return
    }
    res.status(500).json("something went wrong");
    
}

module.exports = errorHandler