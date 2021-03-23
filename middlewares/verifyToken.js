const db = require('../database/models');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers['token'];
    if(!token){
        return res.status(403).json({
            auth : false,
            msg : 'no se ha enviado ningún token'
        })
    }
    try {
        const jwtDecode = jwt.verify(token,process.env.SECRET)
        db.User.findByPk(jwtDecode.id)
        .then(user => {
            if(!user){
                return res.status(401).json({
                    auth : false,
                    msg : "El usuario no está registrado"
                })
            }
           next()
        })
        .catch(error => res.status(500).json({error}))
    } catch (error) {
        return res.status(403).json({
            auth : false,
            msg : 'token inválido'
        })
    }
}

