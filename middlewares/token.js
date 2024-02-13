
const jwt = require('jsonwebtoken')
const user = require("../models/index").User;
// 
// require('dotenv').config({ path: '../../config.env' })

exports.protect = async (req, res, next) => {
    let token

    if (
        
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
           

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user =  await user.findByPk(decoded.id)

            next()
            return
        } catch (error) {
           next(error)
        }
    }

    if (!token) {
        
        res.send('Not authorized, no token').status(401)
        
    }
}

exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 0) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}