const db = require('../database/models'); //requiero la base de datos
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;
const getBaseUrl = (req) => req.protocol + '://' + req.get('host');

module.exports = {
    getAll: function (req, res) {
        db.Genre.findAll()
            .then(genres => {
                genres.forEach(genre => {
                    genre.setDataValue("link", getUrl(req) + '/' + genre.id)

                });
                let response = {
                    meta: {
                        link: getUrl(req),
                        status: 200,
                        cantidad: genres.length
                    },
                    data: genres
                }
                res.status(200).json(response)
            })
            .catch(error => res.status(404).json(error))
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
            db.Genre.findByPk(req.params.id)
                .then(genre => {
                    if (genre) {
                        let response = {
                            meta: {
                                link: getUrl(req),
                                status: 200
                            },
                            data: genre
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
                .catch(err => res.status(404).json(err))
        }
    },
    create: function (req, res) {
        db.Genre.create({
            name: req.body.name,
            ranking: req.body.ranking,
            active: req.body.active
        })
            .then(function (genre) {
                return res.status(201).json({
                    link: getBaseUrl(req) + '/api/genres/' + genre.id,
                    msg: 'Género añadido con éxito'
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
                        return res.status(500).json({ error })
                }

            })
    },
    update: function (req, res) {
        db.Genre.update(
            {
                name: req.body.name,
                ranking: req.body.ranking,
                active: req.body.active
            },
            {
                id: req.params.id
            })
            .then(result => {

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
            .catch(errres.status(500).json(err))
    },
    delete: function (req, res) {
        db.Genre.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result) {
                return res.status(200).json({
                    msg: "Género eliminado"
                })
            } else {
                return res.status(200).json({
                    msg: "No se hicieron cambios"
                })
            }

        })
            .catch(err.status(500).json(err))
    }
}