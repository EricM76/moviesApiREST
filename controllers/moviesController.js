const db = require('../database/models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

const tokenValidate = (res) => {
    if (!req.headers['token']) {
        return res.status(401).json({
            auth: false,
            msg: "Token no enviado"
        })
    }
}

module.exports = {
    getAll: function (req, res) {
        db.Movie.findAll()
            .then(movies => {
                movies.forEach(movie => {
                    movie.setDataValue("link", getUrl(req) + '/' + movies.id)
                });
                let response = {
                    meta: {
                        link: getUrl(req),
                        status: 200,
                        cantidad: movies.length
                    },
                    data: movies
                }
                return res.status(200).json(response)
            })
    },
    getById: function (req, res) {
        if (req.params.id % 1 !== 0) {
            let response = {
                meta: {
                    status: 400,
                    msg: 'ID incorrecto'
                }
            }
            return res.status(404).json(response)
        } else {
            db.Movie.findByPk(req.params.id)
                .then(movie => {
                    if (movie) {
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200
                            },
                            data: movie
                        }
                        return res.status(200).json(response)
                    } else {
                        let response = {
                            meta: {
                                status: 404,
                                msg: 'ID no encontrado'
                            }
                        }
                        return res.status(404).json(response)
                    }
                })
                .catch(error => res.status(400).send(error))
        }

    },
    create: function (req, res) {
        tokenValidate(res)
        try {
            const jwtDecode = jwt.verify(token, process.env.SECRET)
            db.User.findByPk(jwtDecode.id)
                .then(user => {
                    if (!user) {
                        return res.status(401).json({
                            msg: "El usuario no está registrado"
                        })
                    } else {
                        const { title, rating, awards, release_date, length } = req.body
                        db.Movie.create({
                            title,
                            rating,
                            awards,
                            release_date,
                            length
                        })
                            .then(function () {
                                return res.status(201).json({
                                    link: getBaseUrl(req) + '/api/movies/' + pelicula.id,
                                    msg: "Pelicula añadida con éxito"
                                })
                            })
                            .catch(error => {
                                switch (error.name) {
                                    case "SequelizeValidationError":
                                        let erroresMsg = [];
                                        let erroresNotNull = [];
                                        let erroresValidation = [];
                                        error.errors.forEach(error => {
                                            erroresMsg.push(error.message)
                                            if (error.type == "notNull Violation") {
                                                erroresNotNull.push(error.message)
                                            }
                                            if (error.type == "Validation error") {
                                                erroresValidation.push(error.message)
                                            }
                                        });
                                        let response = {
                                            status: 400,
                                            messages: "datos faltantes o erróneos",
                                            errores: {
                                                cantidad: erroresMsg.length,
                                                msg: erroresMsg,
                                                notNull: erroresNotNull,
                                                validation: erroresValidation
                                            }
                                        }
                                        return res.status(400).json(response)
                                    default:
                                        return res.status(500).json(error)
                                }
                            })
                    }
                })
        } catch (error) {
            res.status(403).json({
                error,
                status : 403,
                msg : "Token inválido"
            })
        }
    },
    update: function (req, res) {
        const { title, rating, awards, release_date, length } = req.body

        db.Movie.update({
            title,
            rating,
            awards,
            release_date,
            length
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                if (result[0]) {
                    console.log(result)
                    return res.status(201).json({
                        msg: "Actualización exitosa"
                    })
                } else {
                    return res.status(200).json({
                        msg: "No se hicieron cambios"
                    })
                }
            })
            .catch(err => res.status(500).json(err))
    },
    remove: function (req, res) {
        let actorUpdate = db.Actor.update({
            favorite_movie_id: null
        },
            {
                where: {
                    favorite_movie_id: req.params.id
                }
            })
        let actorMovieUpdate = db.actor_movie.destroy({
            where: {
                movie_id: req.params.id
            }
        })
        Promise.all([actorUpdate, actorMovieUpdate])
            .then(
                db.Movie.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(result => {
                        if (result) {
                            return res.status(200).json({
                                msg: "Pelicula eliminada"
                            })
                        } else {
                            return res.status(200).json({
                                msg: "No se hicieron cambios"
                            })
                        }

                    })
                    .catch(err => res.status(500).json(err))
            )

    }

}