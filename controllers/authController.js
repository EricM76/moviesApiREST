const db = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyData = (email,pass,res) => {
    if(!email || !pass){
        return res.status(401).json({
            status : 401,
            msg : 'Debes ingresar email y constraseña (pass)'
        })
    }
}
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    index : (req,res)=>{
        res.status(200).json({
            register : {
                endpoint : getBaseUrl(req) + '/register',
                method : 'POST'
            },
            login : {
                endpoint : getBaseUrl(req) + '/login',
                method : 'POST'
            },
            movies : {
                all : {
                    endpoint : getBaseUrl(req) + '/api/movies/',
                    method : 'GET'
                },
                one : {
                    endpoint : getBaseUrl(req) + '/api/movies/{id}',
                    method : 'GET'
                },
                create : {
                    endpoint : getBaseUrl(req) + '/api/movies/create',
                    method : 'POST',
                    dataRequired : {
                        title : 'string(500)',
                        rating : 'decimal(3,1) UNSIGNED',
                        awards : 'integer UNSIGNED',
                        release_date : 'datetime',
                        length : 'integer UNSIGNED (opcional)',
                        genre_id : 'integer (opcional)'
                    }
                },
                update : {
                    endpoint : getBaseUrl(req) + '/api/movies/update/{id}',
                    method : 'PUT'
                },
                delete : {
                    endpoint : getBaseUrl(req) + '/api/movies/delete/{id}',
                    method : 'DELETE'
                },
                
            }
        })
    },
    register : (req,res) => {
        const {email, pass} = req.body;
        
        verifyData(email,pass,res)
        
        db.User.create({
            email,
            pass : bcrypt.hashSync(pass,12)
        })
        .then(user => {
            const token = jwt.sign(
                {
                    id:user.id
                },
                process.env.SECRET,
                {
                    expiresIn:120 //120 segundos
                }
                )
          return res.status(200).json({
                    status : 200,
                    auth : true,
                    token : token
                })
        })
        .catch(error => res.status(500).json(error))
    },
    login : (req,res) => {
        const {email, pass} = req.body

        verifyData(email,pass,res)

        db.User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if (!user || !bcrypt.compareSync(pass, user.pass)){
                return res.status(401).json({
                            auth : false,
                            msg : "credenciales inválidas"
                        })
            }
            const token = jwt.sign(
                {
                    id:user.id
                },
                process.env.SECRET,
                {
                    expiresIn:120 //120 segundos
                })

            return res.status(200).json({
                        status : 200,
                        auth  : true,
                        token : token
                    })
        })
    },
    profile : (req,res) => {
        const token = req.headers['token'];
        if(!token){
            return res.status(403).json({
                status : 403,
                auth:false,
                msg:"No se ha enviado un token"
            })
        }
        try{
            const jwtDecode = jwt.verify(token,process.env.SECRET);
            db.User.findByPk(jwtDecode.id)
            .then(user => {
                if(!user){
                    return res.status(401).json({
                                msg : 'El usuario no está registrado'
                            })
                }
                return res.status(200).json('El usuario logueado es ' + user.email)
            })
            .catch(error => res.status(500).json(error))
        } catch(error){
            return res.status(403).json({
                        error,
                        status : 403,
                        msg : "Token inválido"
                    })
        }
    }
}
