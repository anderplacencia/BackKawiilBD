const {verifyToken} = require("../utils/jwt");
const User = require("../api/models/user.model")

const isAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;

        if(!auth){
            res.status(400).json({message: "No está autorizado"})
        }
        
        const token = auth.split(" ")[1]//limpiar el authorization string
        console.log("auth: " , token);
        const tokenVerified = verifyToken(token)
        //console.log(tokenVerified)
        if(!tokenVerified._id) {
            return res.status(400).json({ message: "Token incorrecto "});
        };

        const userProfile = await User.findById(tokenVerified._id)

        req.userProfile = userProfile;
        next()


    } catch (error) {
        console.log(error)
        
    }
}

module.exports = { isAuth };