const jwt = require("jsonwebtoken");

const generateToken = (data) => {
    return jwt.sign(data, "secreteKey", {expiresIn:"1h"})
}

const verifyToken = (token) => {
    return jwt.verify(token, "secreteKey")
}


module.exports = { generateToken, verifyToken };