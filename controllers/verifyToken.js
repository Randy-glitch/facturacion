const jwt = require("jsonwebtoken")

function verifyToken (req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ERR:"USER NO AUTORIZED!"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err,  user) => {
            if (err) {
                return res.status(403).json({ERR:"TOKEN INVALID!"})
            }
            req.user = user
            next()
        } )


}

module.exports = verifyToken