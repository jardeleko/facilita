const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            if(err) {
                res.status(403).json("Token is not valid!")
            }
            else{ 
                req.user = user;
                next();
            }
        })
    }else {
        return res.status(401).json("You are not authenticated!")
    }
}
const verifyTokenAuth = async (req, res, next) => {
    await User.findById(req.params.userId).then(() => {
        verifyToken(req, res, () => {
            next()
        })
    }).catch((err) => {
        res.status(403).json("User not exists!")
    })
}

module.exports = {verifyToken, verifyTokenAuth}